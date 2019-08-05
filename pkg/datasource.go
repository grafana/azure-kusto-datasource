package main

import (
	"encoding/json"
	"fmt"

	"github.com/grafana/azure-data-explorer-datasource/pkg/azuredx"
	"github.com/grafana/grafana_plugin_model/go/datasource"
	hclog "github.com/hashicorp/go-hclog"
	plugin "github.com/hashicorp/go-plugin"
	"golang.org/x/net/context"
)

// GrafanaAzureDXDatasource stores reference to plugin and logger
type GrafanaAzureDXDatasource struct {
	plugin.NetRPCUnsupportedPlugin
	logger hclog.Logger
}

// Query is the primary method called by grafana-server
func (plugin *GrafanaAzureDXDatasource) Query(ctx context.Context, tsdbReq *datasource.DatasourceRequest) (*datasource.DatasourceResponse, error) {
	response := &datasource.DatasourceResponse{
		Results: make([]*datasource.QueryResult, len(tsdbReq.Queries)),
	}

	plugin.logger.Debug("Query", "datasource", tsdbReq.Datasource.Name, "TimeRange", tsdbReq.TimeRange)

	client, err := azuredx.NewClient(ctx, tsdbReq.GetDatasource(), plugin.logger)
	if err != nil {
		return nil, err
	}

	for idx, q := range tsdbReq.GetQueries() {
		qm := &azuredx.QueryModel{}
		err := json.Unmarshal([]byte(q.GetModelJson()), qm)
		if err != nil {
			return nil, err
		}
		qm.MacroData = azuredx.NewMacroData(tsdbReq.GetTimeRange(), q.GetIntervalMs())
		if err := qm.Interpolate(); err != nil {
			return nil, err
		}
		md := &Metadata{
			RawQuery: qm.Query.CSL,
		}
		qr := &datasource.QueryResult{
			RefId: q.GetRefId(),
		}
		response.Results[idx] = qr
		var tableRes *azuredx.TableResponse
		tableRes, md.KustoError, err = client.KustoRequest(qm.Query)
		if err != nil {
			qr.Error = err.Error()
			if mdString, jsonErr := md.JSONString(); jsonErr != nil {
				plugin.logger.Debug("failed to marshal metadata: %v", jsonErr)
			} else {
				qr.MetaJson = mdString
			}
			continue
		}
		switch qm.Format {
		case "test":
			err := client.TestRequest()
			if err != nil {
				return nil, err
			}
			return response, nil
		case "table":
			gTables, err := tableRes.ToTables()
			if err != nil {
				return nil, err
			}
			if len(gTables) > 0 { // TODO(Not sure how to handle multiple tables yet)
				qr.Tables = []*datasource.Table{gTables[0]}
			}
		case "time_series":
			series, err := tableRes.ToTimeSeries()
			if err != nil {
				return nil, err
			}
			qr.Series = series
		case "time_series_adx_series":
			series, err := tableRes.ToADXTimeSeries()
			if err != nil {
				return nil, err
			}
			qr.Series = series
		default:
			return nil, fmt.Errorf("unsupported query type: '%v'", qm.QueryType)
		}

		if mdString, err := md.JSONString(); err != nil {
			plugin.logger.Debug("could not add metadata") // only log since this is just metadata
		} else {
			if qr.Error == "" {
				qr.MetaJson = mdString
			}
		}
	}
	return response, nil
}

// Metadata holds datasource metadata to send to the frontend
type Metadata struct {
	RawQuery   string
	KustoError string
}

func (md *Metadata) JSONString() (string, error) {
	b, err := json.Marshal(md)
	if err != nil {
		return "", err
	}
	return string(b), nil
}
