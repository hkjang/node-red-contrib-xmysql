node-red-contrib-xmysql
========================
A <a href="http://nodered.org" target="_new">Node-RED</a> 
node to get response to  <a href="https://github.com/o1lab/xmysql" target="_new"> xmysql api </a>.

Install
-------
Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-xmysql

Usage
-----
## xmysql API 
<i><a href="https://github.com/o1lab/xmysql" target="_new">xmysql</a></i> api request node.

Expects a <b>msg.payload</b> with request(get,post,put,patch,delete) params.

## API Overview

| HTTP Type | API URL                          | Comments                                               |
|-----------|----------------------------------|--------------------------------------------------------- 
| GET       | /                                | Gets all REST APIs                                     |
| GET       | /api/tableName                   | Lists rows of table                                    |
| POST      | /api/tableName                   | Create a new row                                       |
| PUT       | /api/tableName                   | Replaces existing row with new row                     |
| POST :fire:| /api/tableName/bulk             | Create multiple rows - send object array in request body|
| GET  :fire:| /api/tableName/bulk             | Lists multiple rows - /api/tableName/bulk?_ids=1,2,3   |
| DELETE :fire:| /api/tableName/bulk           | Deletes multiple rows - /api/tableName/bulk?_ids=1,2,3 |
| GET       | /api/tableName/:id               | Retrieves a row by primary key                         |
| PATCH     | /api/tableName/:id               | Updates row element by primary key                     |
| DELETE    | /api/tableName/:id               | Delete a row by primary key                            |
| GET       | /api/tableName/findOne           | Works as list but gets single record matching criteria |
| GET       | /api/tableName/count             | Count number of rows in a table                        |
| GET       | /api/tableName/distinct          | Distinct row(s) in table - /api/tableName/distinct?_fields=col1|
| GET       | /api/tableName/:id/exists        | True or false whether a row exists or not              |
| GET       | [/api/parentTable/:id/childTable](#relational-tables)             | Get list of child table rows with parent table foreign key   | 
| GET :fire:| [/api/tableName/aggregate](#aggregate-functions)                  | Aggregate results of numeric column(s)                 |
| GET :fire:| [/api/tableName/groupby](#group-by-having-as-api)                 | Group by results of column(s)                          |
| GET :fire:| [/api/tableName/ugroupby](#union-of-multiple-group-by-statements) | Multiple group by results using one call               |
| GET :fire:| [/api/tableName/chart](#chart)                                    | Numeric column distribution based on (min,max,step) or(step array) or (automagic)|
| GET :fire:| [/api/tableName/autochart](#autochart)                            | Same as Chart but identifies which are numeric column automatically - gift for lazy while prototyping|
| GET :fire:| [/api/xjoin](#xjoin)                                              | handles join                                        |
| GET :fire:| [/dynamic](#run-dynamic-queries)                                  | execute dynamic mysql statements with params           |
| GET :fire:| [/upload](#upload-single-file)                                    | upload single file                                     |
| GET :fire:| [/uploads](#upload-multiple-files)                                | upload multiple files                                  |
| GET :fire:| [/download](#download-file)                                       | download a file                                        |
| GET       | /api/tableName/describe                                           | describe each table for its columns      |
| GET       | /api/tables                                                       | get all tables in database                           |
| GET       | [/_health](#health)                                               | gets health of process and mysql -- details query params for more details |
| GET       | [/_version](#version)                                             | gets version of Xmysql, mysql, node|


### API URL
- The url to call the xmysql API.
### method
- Http Request Method 
## parameter example
```javascript
# GET
msg.method = 'get'
// msg.payload.id = '4';

# POST
msg.method = 'post'
msg.payload.price = '300';
msg.payload.tax = '30';

# PUT
msg.method = 'put'
msg.payload.id = '2';
msg.payload.price = '400';
msg.payload.tax = '40';

# DELETE
msg.method = 'delete'
msg.payload.id = '2';
```

## sample flow
```json
[{"id":"3e1b116b.cedffe","type":"http request","z":"3f322a34.631386","name":"","method":"POST","ret":"obj","paytoqs":"ignore","url":"https://yourdomain.com/auth/local","tls":"","persist":false,"proxy":"","authType":"","x":450,"y":360,"wires":[["5b7cb68a.595e98"]]},{"id":"f5982664.8ffe08","type":"inject","z":"3f322a34.631386","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":120,"y":360,"wires":[["7b10baf0.334ff4"]]},{"id":"5b7cb68a.595e98","type":"debug","z":"3f322a34.631386","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":630,"y":360,"wires":[]},{"id":"7b10baf0.334ff4","type":"function","z":"3f322a34.631386","name":"","func":"msg = {}\nmsg.payload = {};\nmsg.payload.identifier = 'test';\nmsg.payload.password = 'test1234!';\n\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":280,"y":360,"wires":[["3e1b116b.cedffe"]]},{"id":"a7d351e3.67da4","type":"inject","z":"3f322a34.631386","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":120,"y":400,"wires":[["9fdc864d.3c9578"]]},{"id":"89adfa3d.3a4578","type":"debug","z":"3f322a34.631386","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":730,"y":400,"wires":[]},{"id":"9fdc864d.3c9578","type":"function","z":"3f322a34.631386","name":"","func":"msg = {};\nmsg.payload = {};\nmsg.method = 'get';\nmsg.payload.id = '1';\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":280,"y":400,"wires":[["8b66bc62.ae2e5"]]},{"id":"70077ccd.7c0fc4","type":"json","z":"3f322a34.631386","name":"","property":"payload","action":"","pretty":false,"x":560,"y":400,"wires":[["89adfa3d.3a4578"]]},{"id":"8b66bc62.ae2e5","type":"xmysql","z":"3f322a34.631386","xmysqlAPIURL":"https://yourdomain.com/products","tableName":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk3MTQ0MzQwLCJleHAiOjE1OTk3MzYzNDB9.ULLdLkpXQ0ElmOp-QzFk_gHZfoDd6Ee0l7DVdhxaAII","x":430,"y":400,"wires":[["70077ccd.7c0fc4"]]}]

```
