define(["lodash","app/core/config","moment","app/plugins/sdk","angular"],(function(t,e,r,n,o){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=5)}([function(e,r){e.exports=t},function(t,r){t.exports=e},function(t,e){t.exports=r},function(t,e){t.exports=n},function(t,e){t.exports=o},function(t,e,r){"use strict";r.r(e);var n=r(0),o=r.n(n),a=function(t,e){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};function i(t,e,r,n){return new(r||(r=Promise))((function(o,a){function i(t){try{u(n.next(t))}catch(t){a(t)}}function s(t){try{u(n.throw(t))}catch(t){a(t)}}function u(t){t.done?o(t.value):new r((function(e){e(t.value)})).then(i,s)}u((n=n.apply(t,e||[])).next())}))}function s(t,e){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i)}catch(t){a=[6,t],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}function u(t){var e="function"==typeof Symbol&&t[Symbol.iterator],r=0;return e?e.call(t):{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}}}var l=r(2),c=r.n(l),d=function(){function t(){}return t.prototype.parseDatabases=function(t){var e,r,n,o,a=[];if(!t||!t.data||!t.data.Tables||0===t.data.Tables.length)return a;try{for(var i=u(t.data.Tables),s=i.next();!s.done;s=i.next()){var l=s.value;try{for(var c=(n=void 0,u(l.Rows)),d=c.next();!d.done;d=c.next()){var h=d.value;a.push({text:h[5]||h[0],value:h[0]})}}catch(t){n={error:t}}finally{try{d&&!d.done&&(o=c.return)&&o.call(c)}finally{if(n)throw n.error}}}}catch(t){e={error:t}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return a},t.prototype.parseSchemaResult=function(t){var e=t.Tables[0].Rows[0][0];return JSON.parse(e)},t.prototype.parseQueryResult=function(t){for(var e=[],r=[],n=0;n<t.length;n++)if(0!==t[n].result.data.Tables.length){r=t[n].result.data.Tables[0].Columns;var a=t[n].result.data.Tables[0].Rows;e="time_series"===t[n].query.resultFormat?o.a.concat(e,this.parseTimeSeriesResult(t[n].query,r,a)):o.a.concat(e,this.parseTableResult(t[n].query,r,a))}return{data:e}},t.prototype.parseTimeSeriesResult=function(e,r,n){for(var o,a,i=[],s=-1,l=-1,c=-1,d=0;d<r.length;d++)-1===s&&"datetime"===r[d].ColumnType&&(s=d),-1===l&&"string"===r[d].ColumnType&&(l=d),-1===c&&["int","long","real","double"].includes(r[d].ColumnType)&&(c=d);if(-1===s)throw new Error("No datetime column found in the result. The Time Series format requires a time column.");try{for(var h=u(n),f=h.next();!f.done;f=h.next()){var p=f.value,m=t.dateTimeToEpoch(p[s]),g=l>-1?p[l]:r[c].name,y=t.findOrCreateBucket(i,g);y.datapoints.push([p[c],m]),y.refId=e.refId,y.query=e.query}}catch(t){o={error:t}}finally{try{f&&!f.done&&(a=h.return)&&a.call(h)}finally{if(o)throw o.error}}return i},t.prototype.parseTableResult=function(t,e,r){return{type:"table",columns:o.a.map(e,(function(t){return{text:t.ColumnName,type:t.ColumnType}})),rows:r,refId:t.refId,query:t.query}},t.prototype.parseToVariables=function(t){var e,r,n,a,i=[],s=this.parseQueryResult(t);try{for(var l=u(s.data),c=l.next();!c.done;c=l.next()){var d=c.value;try{for(var h=(n=void 0,u(o.a.flattenDeep(d.rows))),f=h.next();!f.done;f=h.next()){var p=f.value;i.push({text:p,value:p})}}catch(t){n={error:t}}finally{try{f&&!f.done&&(a=h.return)&&a.call(h)}finally{if(n)throw n.error}}}}catch(t){e={error:t}}finally{try{c&&!c.done&&(r=l.return)&&r.call(l)}finally{if(e)throw e.error}}return i},t.prototype.transformToAnnotations=function(e,r){var n,o,a,i,s=this.parseQueryResult(r),l=[];try{for(var c=u(s.data),d=c.next();!d.done;d=c.next()){for(var h=d.value,f=-1,p=-1,m=-1,g=0;g<h.columns.length;g++)-1===f&&"datetime"===h.columns[g].type&&(f=g),-1===p&&"text"===h.columns[g].text.toLowerCase()&&(p=g),-1===m&&"tags"===h.columns[g].text.toLowerCase()&&(m=g);try{for(var y=(a=void 0,u(h.rows)),v=y.next();!v.done;v=y.next()){var b=v.value;l.push({annotation:e.annotation,time:Math.floor(t.dateTimeToEpoch(b[f])),text:b[p]?b[p].toString():"",tags:b[m]?b[m].trim().split(/\s*,\s*/):[]})}}catch(t){a={error:t}}finally{try{v&&!v.done&&(i=y.return)&&i.call(y)}finally{if(a)throw a.error}}}}catch(t){n={error:t}}finally{try{d&&!d.done&&(o=c.return)&&o.call(c)}finally{if(n)throw n.error}}return l},t.findOrCreateBucket=function(t,e){var r=o.a.find(t,["target",e]);return r||(r={target:e,datapoints:[],refId:"",query:""},t.push(r)),r},t.dateTimeToEpoch=function(t){return c()(t).valueOf()},t.prototype.processQueryResult=function(t){var e,r,n,o,a=[];if(!t.data.results)return{data:a};for(var i in t.data.results){var s=t.data.results[i];if(s.series)try{for(var l=(e=void 0,u(s.series)),c=l.next();!c.done;c=l.next()){var d=c.value;a.push({target:d.name,datapoints:d.points,refId:s.refId,meta:s.meta})}}catch(t){e={error:t}}finally{try{c&&!c.done&&(r=l.return)&&r.call(l)}finally{if(e)throw e.error}}if(s.tables)try{for(var h=(n=void 0,u(s.tables)),f=h.next();!f.done;f=h.next()){var p=f.value;p.type="table",p.refId=s.refId,p.meta=s.meta,a.push(p)}}catch(t){n={error:t}}finally{try{f&&!f.done&&(o=h.return)&&o.call(h)}finally{if(n)throw n.error}}}return{data:a}},t}(),h=function(){function t(t,e){this.rawQuery=t,this.options=e}return t.prototype.interpolate=function(){var t=this;if(!this.rawQuery)return{query:""};var e=this.rawQuery;return e=(e=e.replace(/\$__([_a-zA-Z0-9]+)\(([^\)]*)\)/gi,(function(e,r,n){return"contains"===r?t.getMultiContains(n):e}))).replace(/\$__escapeMulti\(('[^]*')\)/gi,(function(e,r){return t.escape(r)})),this.options,{query:e}},t.prototype.getFrom=function(t){var e=t.range.from;return"datetime("+c()(e).startOf("minute").toISOString()+")"},t.prototype.getUntil=function(t){if("now"===t.rangeRaw.to)return"now()";var e=t.range.to;return"datetime("+c()(e).startOf("minute").toISOString()+")"},t.prototype.getTimeFilter=function(t,e){return"now"===e.rangeRaw.to?t+" >= "+this.getFrom(e):t+"  >= "+this.getFrom(e)+" and "+t+" <= "+this.getUntil(e)},t.prototype.getMultiContains=function(t){var e=t.indexOf(","),r=t.substring(0,e),n=t.substring(t.indexOf(",")+1);return n&&"all"===n.toLowerCase().trim()?"1 == 1":r.trim()+" in ("+n.trim()+")"},t.prototype.escape=function(t){return t.substring(1,t.length-1).split("','").map((function(t){return"@'"+t+"'"})).join(", ")},t}(),f=function(){function t(t){void 0===t&&(t={ttl:1e4}),this.opts=t,this.store={}}return t.prototype.put=function(t,e,r){var n=this;void 0===r&&(r=this.opts.ttl),void 0!==t&&void 0!==e&&(this.del(t),this.store[t]={value:e,expire:Date.now()+r,timeout:setTimeout((function(){n.del(t)}),r)})},t.prototype.get=function(t){var e=this.store[t];return e&&e.expire&&e.expire<=Date.now()&&(this.del(t),e=void 0),e&&e.value},t.prototype.del=function(t){this.store.hasOwnProperty(t)&&(clearTimeout(this.store[t].timeout),delete this.store[t])},t}(),p=function(){function t(t){this.backendSrv=t,this.ongoingRequests={}}return t.prototype.doRequest=function(t,e,r){return void 0===r&&(r=1),i(this,void 0,void 0,(function(){var n=this;return s(this,(function(o){return[2,this.backendSrv.datasourceRequest({url:t,method:"POST",data:e}).catch((function(o){if(r>0)return n.doRequest(t,e,r-1);throw o}))]}))}))},t.prototype.dsPost=function(t,e,r){return i(this,void 0,void 0,(function(){var n=this;return s(this,(function(o){return this.ongoingRequests.hasOwnProperty(t)?[2,this.ongoingRequests[t]]:(this.ongoingRequests[t]=new Promise((function(o,a){return i(n,void 0,void 0,(function(){var n,i;return s(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,3,4]),[4,this.doRequest(e,r)];case 1:return n=s.sent(),o(n),[3,4];case 2:return i=s.sent(),a(i),[3,4];case 3:return delete this.ongoingRequests[t],[7];case 4:return[2]}}))}))})),[2,this.ongoingRequests[t]])}))}))},t}(),m=function(){function t(t,e,r,n){this.backendSrv=e,this.$q=r,this.templateSrv=n,this.name=t.name,this.id=t.id,this.baseUrl="/azuredataexplorer",this.url=t.url,this.defaultOrFirstDatabase=t.jsonData.defaultDatabase,this.cache=new f({ttl:this.getCacheTtl(t)}),this.requestAggregatorSrv=new p(e)}return t.$inject=["instanceSettings","backendSrv","$q","templateSrv"],t.prototype.query=function(t){var e=this,r=o.a.filter(t.targets,(function(t){return!0!==t.hide})).map((function(r){var n=new h(e.templateSrv.replace(r.query,t.scopedVars,e.interpolateVariable),t).interpolate().query;return{refId:r.refId,intervalMs:t.intervalMs,maxDataPoints:t.maxDataPoints,datasourceId:e.id,query:n,database:r.database,resultFormat:r.resultFormat}}));return 0===r.length?this.$q.when({data:[]}):this.backendSrv.datasourceRequest({url:"/api/tsdb/query",method:"POST",data:{from:t.range.from.valueOf().toString(),to:t.range.to.valueOf().toString(),queries:r}}).then((new d).processQueryResult)},t.prototype.annotationQuery=function(t){if(!t.annotation.rawQuery)return this.$q.reject({message:"Query missing in annotation definition"});var e=this.buildQuery(t.annotation.rawQuery,t,t.annotation.database),r=this.doQueries(e);return this.$q.all(r).then((function(e){return(new d).transformToAnnotations(t,e)}))},t.prototype.metricFindQuery=function(t){var e=this;return this.getDefaultOrFirstDatabase().then((function(r){var n=e.buildQuery(t,null,r),o=e.doQueries(n);return e.$q.all(o).then((function(t){return(new d).parseToVariables(t)})).catch((function(t){if(t.error&&t.error.data&&t.error.data.error)throw{message:t.error.data.error["@message"]}}))}))},t.prototype.testDatasource=function(){return this.backendSrv.datasourceRequest({url:"/api/tsdb/query",method:"POST",data:{from:"5m",to:"now",queries:[{refId:"A",intervalMs:1,maxDataPoints:1,datasourceId:this.id,query:".show databases",resultFormat:"test"}]}}).then((function(t){return{status:"success",message:"Connection Successful"}})).catch((function(t){return console.log(t),t.data&&t.data.message?{status:"error",message:t.data.message}:{status:"error",message:t.status}}))},t.prototype.getDatabases=function(){var t=this.baseUrl+"/v1/rest/mgmt";return this.doRequest(t,{csl:".show databases"}).then((function(t){return(new d).parseDatabases(t)}))},t.prototype.getDefaultOrFirstDatabase=function(){var t=this;return this.defaultOrFirstDatabase?Promise.resolve(this.defaultOrFirstDatabase):this.getDatabases().then((function(e){return t.defaultOrFirstDatabase=e[0].value,t.defaultOrFirstDatabase}))},t.prototype.getSchema=function(t){var e=this.baseUrl+"/v1/rest/mgmt",r={csl:".show database ["+t+"] schema as json"};return this.doRequest(e,r).then((function(t){return(new d).parseSchemaResult(t.data)}))},t.prototype.doQueries=function(t){var e=this;return t.map((function(t){var r=e.cache.get(t.key);return r||e.requestAggregatorSrv.dsPost(t.key,e.url+t.url,t.data).then((function(r){var n={result:r,query:t};return t.key&&e.cache.put(t.key,n),n})).catch((function(e){throw{error:e,query:t}}))}))},t.prototype.buildQuery=function(t,e,r){var n=new h(this.templateSrv.replace(t,{},this.interpolateVariable),e),o=this.baseUrl+"/v1/rest/query",a=n.interpolate().query,i=[];return i.push({key:o+"-table-"+r+"-"+a,datasourceId:this.id,url:o,resultFormat:"table",data:{csl:a,db:r}}),i},t.prototype.doRequest=function(t,e,r){var n=this;return void 0===r&&(r=1),this.backendSrv.datasourceRequest({url:this.url+t,method:"POST",data:e}).catch((function(o){if(r>0)return n.doRequest(t,e,r-1);throw o}))},t.prototype.interpolateVariable=function(t,e){return"string"==typeof t?e.multi||e.includeAll?"'"+t+"'":t:"number"==typeof t?t:o.a.map(t,(function(e){return"number"==typeof t?t:"'"+e+"'"})).join(",")},t.prototype.getCacheTtl=function(t){if(void 0===t.jsonData.minimalCache)return 3e4;if(t.jsonData.minimalCache<1)throw new Error("Minimal cache must be greater than or equal to 1.");return 1e3*t.jsonData.minimalCache},t}(),g=r(3),y=r(4),v=r.n(y),b=function(){function t(t,e,r,n){this.containerDiv=t,this.defaultTimeField=e,this.getSchema=r,this.config=n,this.splitWithNewLineRegex=/[^\n]+\n?|\n/g,this.newLineRegex=/\r?\n/,this.startsWithKustoPipeRegex=/^\|\s*/g,this.kustoPipeRegexStrict=/^\|\s*$/g}return t.prototype.initMonaco=function(t){var e=this,r=this.config.bootData.user.lightTheme?"grafana-light":"vs-dark";monaco.editor.defineTheme("grafana-light",{base:"vs",inherit:!0,rules:[{token:"comment",foreground:"008000"},{token:"variable.predefined",foreground:"800080"},{token:"function",foreground:"0000FF"},{token:"operator.sql",foreground:"FF4500"},{token:"string",foreground:"B22222"},{token:"operator.scss",foreground:"0000FF"},{token:"variable",foreground:"C71585"},{token:"variable.parameter",foreground:"9932CC"},{token:"",foreground:"000000"},{token:"type",foreground:"0000FF"},{token:"tag",foreground:"0000FF"},{token:"annotation",foreground:"2B91AF"},{token:"keyword",foreground:"0000FF"},{token:"number",foreground:"191970"},{token:"annotation",foreground:"9400D3"},{token:"invalid",background:"cd3131"}],colors:{"textCodeBlock.background":"#FFFFFF"}}),monaco.languages.kusto.kustoDefaults.setLanguageSettings({includeControlCommands:!0,newlineAfterPipe:!0,useIntellisenseV2:!1}),this.codeEditor=monaco.editor.create(this.containerDiv,{value:t.content||"Write your query here",language:"kusto",selectionHighlight:!1,theme:r,folding:!0,lineNumbers:"off",lineHeight:16,suggestFontSize:13,dragAndDrop:!1,occurrencesHighlight:!1,minimap:{enabled:!1},renderIndentGuides:!1,wordWrap:"on"}),this.codeEditor.layout(),1===monaco.editor.getModels().length&&(this.completionItemProvider=monaco.languages.registerCompletionItemProvider("kusto",{triggerCharacters:["."," "],provideCompletionItems:this.getCompletionItems.bind(this)}),this.signatureHelpProvider=monaco.languages.registerSignatureHelpProvider("kusto",{signatureHelpTriggerCharacters:["(",")"],provideSignatureHelp:this.getSignatureHelp.bind(this)})),this.codeEditor.createContextKey("readyToExecute",!0),this.codeEditor.onDidChangeCursorSelection((function(t){e.onDidChangeCursorSelection(t)})),this.getSchema().then((function(t){t&&monaco.languages.kusto.getKustoWorker().then((function(r){var n=e.codeEditor.getModel();n&&r(n.uri).then((function(r){var n=Object.keys(t.Databases).length>0?Object.keys(t.Databases)[0]:"";r.setSchemaFromShowSchema(t,"https://help.kusto.windows.net",n),e.codeEditor.layout()}))}))}))},t.prototype.setOnDidChangeModelContent=function(t){this.codeEditor.onDidChangeModelContent(t)},t.prototype.disposeMonaco=function(){if(this.completionItemProvider)try{this.completionItemProvider.dispose()}catch(t){console.error("Failed to dispose the completion item provider.",t)}if(this.signatureHelpProvider)try{this.signatureHelpProvider.dispose()}catch(t){console.error("Failed to dispose the signature help provider.",t)}if(this.codeEditor)try{this.codeEditor.dispose()}catch(t){console.error("Failed to dispose the editor component.",t)}},t.prototype.addCommand=function(t,e){this.codeEditor.addCommand(t,e,"readyToExecute")},t.prototype.getValue=function(){return this.codeEditor.getValue()},t.prototype.toSuggestionController=function(t){return t},t.prototype.setEditorContent=function(t){this.codeEditor.setValue(t)},t.prototype.getCompletionItems=function(t,e){var r="##### Macro that uses the selected timerange in Grafana to filter the query.\n\n- `$__timeFilter()` -> Uses the "+this.defaultTimeField+" column\n\n- `$__timeFilter(datetimeColumn)` ->  Uses the specified datetime column to build the query.",n=t.getValueInRange({startLineNumber:1,startColumn:1,endLineNumber:e.lineNumber,endColumn:e.column});return o.a.includes(n,"|")?o.a.includes(n.toLowerCase(),"where")?o.a.includes(t.getLineContent(e.lineNumber).toLowerCase(),"where")?[{label:"$__timeFilter(timeColumn)",kind:monaco.languages.CompletionItemKind.Keyword,insertText:{value:"\\$__timeFilter(${0:"+this.defaultTimeField+"})"},documentation:{value:r}},{label:"$__from",kind:monaco.languages.CompletionItemKind.Keyword,insertText:{value:"\\$__from"},documentation:{value:"Built-in variable that returns the from value of the selected timerange in Grafana.\n\nExample: `where "+this.defaultTimeField+" > $__from` "}},{label:"$__to",kind:monaco.languages.CompletionItemKind.Keyword,insertText:{value:"\\$__to"},documentation:{value:"Built-in variable that returns the to value of the selected timerange in Grafana.\n\nExample: `where "+this.defaultTimeField+" < $__to` "}},{label:"$__interval",kind:monaco.languages.CompletionItemKind.Keyword,insertText:{value:"\\$__interval"},documentation:{value:"##### Built-in variable that returns an automatic time grain suitable for the current timerange.\n\nUsed with the bin() function - `bin("+this.defaultTimeField+", $__interval)` \n\n[Grafana docs](http://docs.grafana.org/reference/templating/#the-interval-variable)"}}]:[]:[{label:"where $__timeFilter(timeColumn)",kind:monaco.languages.CompletionItemKind.Keyword,insertText:{value:"where \\$__timeFilter(${0:"+this.defaultTimeField+"})"},documentation:{value:r}}]:[]},t.prototype.getSignatureHelp=function(t,e,r){return"$__timeFilter("!==t.getValueInRange({startLineNumber:e.lineNumber,startColumn:e.column-14,endLineNumber:e.lineNumber,endColumn:e.column})?{}:{activeParameter:0,activeSignature:0,signatures:[{label:"$__timeFilter(timeColumn)",parameters:[{label:"timeColumn",documentation:"Default is "+this.defaultTimeField+" column. Datetime column to filter data using the selected date range. "}]}]}},t.prototype.onDidChangeCursorSelection=function(t){"modelChange"===t.source&&t.reason===monaco.editor.CursorChangeReason.RecoverFromMarkers&&(" "===this.getCharAt(t.selection.positionLineNumber,t.selection.positionColumn-1)&&this.triggerSuggestions())},t.prototype.triggerSuggestions=function(){var t=this.codeEditor.getContribution("editor.contrib.suggestController");if(t){var e=this.toSuggestionController(t);e._model.cancel(),setTimeout((function(){e._model.trigger(!0)}),10)}},t.prototype.getCharAt=function(t,e){var r=this.codeEditor.getModel();if(!r)return"";if(0===r.getLineCount()||r.getLineCount()<t)return"";var n=r.getLineContent(t);return n.length<e||e<1?"":n[e-1]},t}(),w=r(1),C=r.n(w),x='<div id="content" tabindex="0" style="width: 100%; height: 150px"></div>';function S(t,e,r){var n=e.find("#content")[0];function o(t,e){var r=new b(t,e.defaultTimeField,e.getSchema,C.a);r.initMonaco(e),r.addCommand(monaco.KeyMod.Shift|monaco.KeyCode.Enter,(function(){var t=r.getValue();e.content=t,e.onChange()})),e.$watch("content",(function(t,n){var o=r.getValue();t!==o&&t!==n&&e.$$postDigest((function(){r.setEditorContent(t)}))})),r.setOnDidChangeModelContent((function(){e.$apply((function(){var t=r.getValue();e.content=t}))})),e.$on("$destroy",(function(){r.disposeMonaco()}))}window.monaco?setTimeout((function(){o(n,t)}),1):window.System.import("/"+t.pluginBaseUrl+"/lib/monaco.min.js").then((function(){setTimeout((function(){o(n,t)}),1)})),n.onblur=function(){t.onChange()},n.onkeydown=function(t){if("Escape"===t.key)return t.stopPropagation(),!0}}v.a.module("grafana.controllers").directive("kustoMonacoEditor",(function(){return{restrict:"E",template:x,scope:{content:"=",onChange:"&",getSchema:"&",defaultTimeField:"@",pluginBaseUrl:"@"},link:S}}));var T=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.defaults={query:["//change this to create your own time series query","","<table name>","| where $__timeFilter(Timestamp)","// | summarize count() by <group by column>, bin(Timestamp, $__interval)","// | order by Timestamp asc"].join("\n"),resultFormat:"time_series",database:""},o.a.defaultsDeep(n.target,n.defaults),n.panelCtrl.events.on("data-received",n.onDataReceived.bind(n),e),n.panelCtrl.events.on("data-error",n.onDataError.bind(n),e),n.resultFormats=[{text:"Time series",value:"time_series"},{text:"Table",value:"table"},{text:"ADX Time series",value:"time_series_adx_series"}],n.getDatabases(),n}return e.$inject=["$scope","$injector"],function(t,e){function r(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}(e,t),e.prototype.onDataReceived=function(t){this.lastQueryError=void 0,this.lastQuery="",this.timeNotASC=!1;var e=o.a.find(t,{refId:this.target.refId});e&&e.meta&&(this.lastQuery=e.meta.RawQuery,this.timeNotASC=e.meta.TimeNotASC)},e.prototype.onDataError=function(t){this.handleQueryCtrlError(t)},e.prototype.handleQueryCtrlError=function(t){t.query&&t.query.refId&&t.query.refId!==this.target.refId||(t.data&&t.data.results&&t.data.results&&t.data.results[this.target.refId]&&t.data.results[this.target.refId].meta&&""!==t.data.results[this.target.refId].meta.KustoError?this.lastQueryError=t.data.results[this.target.refId].meta.KustoError:t.error&&t.error.data&&t.error.data.error&&t.error.data.error.innererror?t.error.data.error.innererror.innererror?this.lastQueryError=t.error.data.error.innererror.innererror.message:this.lastQueryError=t.error.data.error.innererror["@message"]:t.error&&t.error.data&&t.error.data.error?this.lastQueryError=t.error.data.error.message:t.error&&t.error.data?this.lastQueryError=t.error.data.message:t.data&&t.data.error?this.lastQueryError=t.data.error.message:t.data&&t.data.message?this.lastQueryError=t.data.message:this.lastQueryError=t)},e.prototype.getDatabases=function(){var t=this;return this.datasource.getDatabases().then((function(e){t.databases=e,e.length>0&&!t.target.database&&(t.target.database=t.datasource.defaultOrFirstDatabase||e[0].value)}))},e.prototype.getSchema=function(){var t=this;return this.getDatabases().then((function(){return t.datasource.getSchema(t.target.database)}))},e.templateUrl="partials/query.editor.html",e}(g.QueryCtrl),D=function(){function t(){this.showHelp=!1,this.defaultQuery='<your table>\n| where $__timeFilter() \n| project TimeGenerated, Text=YourTitleColumn, Tags="tag1,tag2"',this.annotation.rawQuery=this.annotation.rawQuery||this.defaultQuery,this.databases=this.getDatabases()}return t.prototype.getDatabases=function(){var t=this;return this.databases&&this.databases.length>0?this.databases:this.datasource.getDatabases().then((function(e){return t.databases=e,e.length>0&&!t.annotation.database&&(t.annotation.database=e[0].value),t.databases})).catch((function(){}))},t.templateUrl="partials/annotations.editor.html",t}(),_=/^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([0-9A-Za-z\.]+))?/,k=function(){function t(t){var e=_.exec(t);e&&(this.major=Number(e[1]),this.minor=Number(e[2]||0),this.patch=Number(e[3]||0),this.meta=e[4])}return t.prototype.isGtOrEq=function(e){for(var r=new t(e),n=0;n<this.comparable.length;++n){if(this.comparable[n]>r.comparable[n])return!0;if(this.comparable[n]<r.comparable[n])return!1}return!0},t.prototype.isValid=function(){return o.a.isNumber(this.major)},Object.defineProperty(t.prototype,"comparable",{get:function(){return[this.major,this.minor,this.patch]},enumerable:!0,configurable:!0}),t}();var q=function(){function t(t,e,r){var n=this;this.hasRequiredGrafanaVersion=this.hasMinVersion(),this.suggestUrl="https://yourcluster.kusto.windows.net",t.getSuggestUrls=function(){return[n.suggestUrl]},this.current.id&&(this.current.url="api/datasources/proxy/"+this.current.id,this.kustoDbDatasource=new m(this.current,e,r,null),this.getDatabases())}return t.$inject=["$scope","backendSrv","$q"],t.prototype.getDatabases=function(){var t=this;return this.kustoDbDatasource.getDatabases().then((function(e){t.databases=e,t.databases.length>0&&(t.current.jsonData.defaultDatabase=t.current.jsonData.defaultDatabase||t.databases[0].value)}))},t.prototype.hasMinVersion=function(){return t=C.a.buildInfo.latestVersion,e="5.3",new k(t).isGtOrEq(e)||"5.3.0-beta1"===C.a.buildInfo.version||"5.3.0-pre1"===C.a.buildInfo.version;var t,e},t.prototype.showMinVersionWarning=function(){return!this.hasRequiredGrafanaVersion},t.templateUrl="partials/config.html",t}();r.d(e,"Datasource",(function(){return m})),r.d(e,"QueryCtrl",(function(){return T})),r.d(e,"ConfigCtrl",(function(){return q})),r.d(e,"AnnotationsQueryCtrl",(function(){return D}))}])}));