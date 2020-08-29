// var axios = require('axios');
var qs = require('querystring');
var request = require('request');

module.exports = function(RED) {
    "use strict";

    // set this to true to spam your console with stuff.
    var xmysqlDebug = true;

    function xmysqlOut(n) {
        RED.nodes.createNode(this,n);
        var self = this;

        this.xmysqlAPIURL = n.xmysqlAPIURL;
        this.tableName = n.tableName || "";
        var node = this;

        this.on('input', function (msg) {
            var xmysqlAPIURL = node.xmysqlAPIURL || msg.xmysqlAPIURL;
            var tableName = node.tableName || msg.tableName;
            var method = node.method || msg.method;
            var data = msg.payload;
            var api = msg.payload.api;
            var id = msg.payload.id;

            if (xmysqlDebug) { node.log(JSON.stringify(data)); }
            try {
                var options = {};
                options.uri = xmysqlAPIURL + '/api/';
                options.method = method;

                if(tableName){
                    options.uri += tableName;
                }else{}
                // node.error(msg.payload.id);
                // node.error(msg.payload.api);
                if(id){
                    options.uri += '/' + id;
                }else{}
                if(api){
                    options.uri += '/' +api;
                }else{}
                if(method === 'get'){
                    options.uri += '?'+qs.stringify(data);
                    options.query = JSON.stringify(data);
                    options.headers = {
                    };
                }else if(method === 'post' || method === 'put' || method === 'delete'){
                    options.body = JSON.stringify(data);
                    options.headers = {
                        'Content-Type': 'application/json',
                        'Content-Length': data.length
                    };
                    node.log(options.body);
                }
                node.log(options.uri);
                request(options, function (err, res, body) {
                    if(err){
                        console.trace();
                        node.log(err,msg);
                    }else{
                        msg.payload = body;
                        msg.res = res;
                        self.send(msg);
                    }
                });
            }
            catch (err) {
                node.log(err,msg);
                console.trace();
            }
        });
    }
    RED.nodes.registerType("xmysql", xmysqlOut);
};
