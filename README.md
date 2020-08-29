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
| GET       | [/api/parentTable/:id/childTable](https://github.com/o1lab/xmysql#relational-tables)             | Get list of child table rows with parent table foreign key   | 
| GET :fire:| [/api/tableName/aggregate](https://github.com/o1lab/xmysql#aggregate-functions)                  | Aggregate results of numeric column(s)                 |
| GET :fire:| [/api/tableName/groupby](https://github.com/o1lab/xmysql#group-by-having-as-api)                 | Group by results of column(s)                          |
| GET :fire:| [/api/tableName/ugroupby](https://github.com/o1lab/xmysql#union-of-multiple-group-by-statements) | Multiple group by results using one call               |
| GET :fire:| [/api/tableName/chart](https://github.com/o1lab/xmysql#chart)                                    | Numeric column distribution based on (min,max,step) or(step array) or (automagic)|
| GET :fire:| [/api/tableName/autochart](https://github.com/o1lab/xmysql#autochart)                            | Same as Chart but identifies which are numeric column automatically - gift for lazy while prototyping|
| GET :fire:| [/api/xjoin](https://github.com/o1lab/xmysql#xjoin)                                              | handles join                                        |
| GET :fire:| [/dynamic](https://github.com/o1lab/xmysql#run-dynamic-queries)                                  | execute dynamic mysql statements with params           |
| GET :fire:| [/upload](https://github.com/o1lab/xmysql#upload-single-file)                                    | upload single file                                     |
| GET :fire:| [/uploads](https://github.com/o1lab/xmysql#upload-multiple-files)                                | upload multiple files                                  |
| GET :fire:| [/download](https://github.com/o1lab/xmysql#download-file)                                       | download a file                                        |
| GET       | /api/tableName/describe                                           | describe each table for its columns      |
| GET       | /api/tables                                                       | get all tables in database                           |
| GET       | [/_health](https://github.com/o1lab/xmysql#health)                                               | gets health of process and mysql -- details query params for more details |
| GET       | [/_version](https://github.com/o1lab/xmysql#version)                                             | gets version of Xmysql, mysql, node|


### API URL

- The url to call the xmysql API.

### method

- Http Request Method 

## parameter example

```javascript
# GET
msg.method = 'get';
// msg.payload.id = '1598617946';
msg.payload.api = 'exists';
msg.payload.api = 'findOne';
msg.payload.api = 'count';
msg.payload.api = 'distinct';
msg.payload.api = 'groupby';
msg.payload.api = 'ugroupby';
msg.payload['_fields'] = 'it_name';
// _fields=it_price&min=0&max=10000&step=1000
msg.payload.api = 'chart';
msg.payload['_fields'] = 'it_price';
msg.payload['min'] = '0';
msg.payload['max'] = '10000';
msg.payload['step'] = '1000';
msg.payload.api = 'aggregate';

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
[{"id":"a7bb362a.8529f8","type":"xmysql","z":"a1c6356a.515558","xmysqlAPIURL":"http://localhost:3000","tableName":"g5_shop_item","x":420,"y":40,"wires":[["aa46913c.7dce9"]]},{"id":"7141e340.8de68c","type":"inject","z":"a1c6356a.515558","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":110,"y":40,"wires":[["1504b988.e70b26"]]},{"id":"1504b988.e70b26","type":"function","z":"a1c6356a.515558","name":"","func":"\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":270,"y":40,"wires":[["a7bb362a.8529f8"]]},{"id":"5e3b6dc5.8ec834","type":"debug","z":"a1c6356a.515558","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":730,"y":40,"wires":[]},{"id":"aa46913c.7dce9","type":"json","z":"a1c6356a.515558","name":"","property":"payload","action":"","pretty":false,"x":570,"y":40,"wires":[["5e3b6dc5.8ec834"]]},{"id":"b5a12c75.c66c3","type":"xmysql","z":"a1c6356a.515558","xmysqlAPIURL":"http://localhost:3000","tableName":"g5_shop_item","x":420,"y":80,"wires":[["ab117167.5b9d4"]]},{"id":"770389a4.d4ba58","type":"inject","z":"a1c6356a.515558","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":110,"y":80,"wires":[["850c4a8f.d80fd8"]]},{"id":"850c4a8f.d80fd8","type":"function","z":"a1c6356a.515558","name":"","func":"msg = {};\nmsg.payload = {};\nmsg.method = 'get';\n// msg.payload.id = '1598617946';\n// msg.payload.id = '0';\nmsg.payload.api = 'exists';\nmsg.payload.api = 'findOne';\nmsg.payload.api = 'count';\nmsg.payload.api = 'distinct';\nmsg.payload.api = 'groupby';\nmsg.payload.api = 'ugroupby';\nmsg.payload['_fields'] = 'it_name';\n// _fields=it_price&min=0&max=10000&step=1000\nmsg.payload.api = 'chart';\nmsg.payload['_fields'] = 'it_price';\nmsg.payload['min'] = '0';\nmsg.payload['max'] = '10000';\nmsg.payload['step'] = '1000';\nmsg.payload.api = 'aggregate';\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":270,"y":80,"wires":[["b5a12c75.c66c3"]]},{"id":"9d9e60df.86174","type":"debug","z":"a1c6356a.515558","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":730,"y":80,"wires":[]},{"id":"ab117167.5b9d4","type":"json","z":"a1c6356a.515558","name":"","property":"payload","action":"","pretty":false,"x":570,"y":80,"wires":[["9d9e60df.86174"]]}]

```
