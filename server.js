
var http = require("http");
var fs = require("fs");
var xlsx = require("node-xlsx");
var express = require('express');
var app = express();

var str='{"id":"123",name:"jack",arg:11111}';

app.get('/', function (req, res) {
    //res.send('Hello GET');
    var dataList = xlsx.parse("./data/testData.xlsx");
    console.log(dataList);
    /*var dataArray = [];
    for(var i= 0;i<dataList.length;i++) {
        var rowObj = {};
        rowObj.name = dataList[i][0];
        rowObj.department = dataList[i][1];
        rowObj.specialty = dataList[i][2];
        rowObj.jobTitle = dataList[i][3];
        dataArray.push(rowObj);
    }*/
    res.writeHead(200,{"Content-Type":'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});

    //res.json({data: dataList});
    res.end(JSON.stringify(dataList));
 
});

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});
