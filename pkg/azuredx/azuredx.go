package azuredx

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httputil"
	"os"

	"golang.org/x/oauth2/microsoft"

	"github.com/grafana/grafana_plugin_model/go/datasource"
	"github.com/hashicorp/go-hclog"
	"golang.org/x/oauth2/clientcredentials"
)

// QueryModel contains the query information from the API call that we use to make a query.
type QueryModel struct {
	Format    string         `json:"format"`
	QueryType string         `json:"queryType"`
	Query     RequestPayload `json:"data"`
	MacroData MacroData
}

// Interpolate applys macro expansion on the QueryModel's Payload's Query string
func (qm *QueryModel) Interpolate() (err error) {
	qm.Query.CSL, err = qm.MacroData.Interpolate(qm.Query.CSL)
	return
}

// dataSourceData holds the datasource configuration information for Azure Data Explorer's API
// that is needed to execute a request against Azure's Data Explorer API.
type dataSourceData struct {
	ClientID        string `json:"clientId"`
	TenantID        string `json:"tenantId"`
	ClusterURL      string `json:"clusterUrl"`
	DefaultDatabase string `json:"defaultDatabase"`
	Secret          string `json:"-"`
}

// Client is an http.Client used for API requests.
type Client struct {
	*http.Client
	*dataSourceData
	Log hclog.Logger
}

// RequestPayload is the information that makes up a Kusto query for Azure's Data Explorer API.
type RequestPayload struct {
	DB         string `json:"db"`
	CSL        string `json:"csl"`
	Properties string `json:"properties"`
}

// newDataSourceData creates a dataSourceData from the plugin API's DatasourceInfo's
// JSONData and Encrypted JSONData which contains the information needed to connected to
// the datasource.
func newDataSourceData(dInfo *datasource.DatasourceInfo) (*dataSourceData, error) {
	d := dataSourceData{}
	err := json.Unmarshal([]byte(dInfo.GetJsonData()), &d)
	if err != nil {
		return nil, err
	}
	d.Secret = dInfo.GetDecryptedSecureJsonData()["clientSecret"]
	return &d, nil
}

// NewClient creates a new Azure Data Explorer http client from the DatasourceInfo.
// AAD OAuth authentication is setup for the client.
func NewClient(ctx context.Context, dInfo *datasource.DatasourceInfo, logger hclog.Logger) (*Client, error) {
	c := Client{}
	c.Log = logger
	var err error
	c.dataSourceData, err = newDataSourceData(dInfo)
	if err != nil {
		return nil, err
	}

	conf := clientcredentials.Config{
		ClientID:     c.ClientID,
		ClientSecret: c.Secret,
		TokenURL:     microsoft.AzureADEndpoint(c.TenantID).TokenURL,
		Scopes:       []string{"https://kusto.kusto.windows.net/.default"},
	}

	c.Client = conf.Client(ctx)
	return &c, nil
}

// TestRequest handles a data source test request in Grafana's Datasource configuration UI.
func (c *Client) TestRequest() error {
	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(RequestPayload{
		CSL: ".show databases schema",
		DB:  c.DefaultDatabase,
	})
	if err != nil {
		return err
	}

	resp, err := c.Post(c.ClusterURL+"/v1/rest/query", "application/json", &buf)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode > 299 {
		return fmt.Errorf("HTTP error: %v", resp.Status)
	}
	return nil
}

// KustoRequest executes a Kusto Query language request to Azure's Data Explorer V1 REST API
// and returns a TableResponse.
func (c *Client) KustoRequest(payload RequestPayload) (*TableResponse, error) {
	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(payload)
	c.Log.Debug("Table Request Payload", fmt.Sprintf("%v", payload))
	if err != nil {
		return nil, err
	}

	resp, err := c.Post(c.ClusterURL+"/v1/rest/query", "application/json", &buf)
	if err != nil {
		return nil, err
	}
	err = dumpResponseToFile(resp, "/home/kbrandt/tmp/dumps.log") // TODO Remove
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode > 299 {
		bodyBytes, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		bodyString := string(bodyBytes)
		return nil, fmt.Errorf("HTTP error: %v - %v", resp.Status, bodyString)
	}
	return tableFromJSON(resp.Body)
}

func tableFromJSON(rc io.Reader) (*TableResponse, error) {
	tr := &TableResponse{}
	decoder := json.NewDecoder(rc)
	// Numbers as string (json.Number) so we can keep types as best we can (since the response has 'type' of column)
	decoder.UseNumber()
	err := decoder.Decode(tr)
	if err != nil {
		return nil, err
	}
	if tr.Tables == nil || len(tr.Tables) == 0 {
		return nil, fmt.Errorf("unable to parse response, parsed response has no tables")
	}
	return tr, nil
}

// TODO Temporary
func dumpResponseToFile(resp *http.Response, filename string) error {
	dump, err := httputil.DumpResponse(resp, true)
	if err != nil {
		return err
	}
	f, err := os.OpenFile(filename, os.O_APPEND|os.O_WRONLY, 0600)
	if err != nil {
		return err
	}

	defer f.Close()

	if _, err = f.Write(dump); err != nil {
		return err
	}
	return nil
}