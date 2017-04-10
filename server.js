
var http = require("http");
var fs = require("fs");
var xlsx = require("node-xlsx");
var express = require('express');
var app = express();

var str='{"id":"123",name:"jack",arg:11111}';

app.get('/', function (req, res) {
    //res.send('Hello GET');
    var dataArray = xlsx.parse("./data/testData.xlsx");
    //取sheet1中的数据，list是一个二维数组
    var list = dataArray[0].data;
    var responseData = [];
    for(var i= 1;i<list.length;i++) {
        //console.log(list[i]);
        var rowObj = {};
        rowObj.name = list[i][0];
        rowObj.department = list[i][1];
        rowObj.specialty = list[i][2];
        rowObj.jobTitle = list[i][3];
        responseData.push(rowObj);
    }
    res.writeHead(200,{"Content-Type":'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});

    //res.json({data: dataList});
    res.end(JSON.stringify(responseData));
 
});

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});
