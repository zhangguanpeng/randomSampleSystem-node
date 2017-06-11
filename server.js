
var http = require("http");
var fs = require("fs");
var xlsx = require("node-xlsx");
var express = require('express');
var app = express();

//设置静态资源目录
app.use(express.static('./'));

//登录接口--暂时不写

//获取数据的接口
app.get('/getdata', function (req, res) {
    console.log(req.query);
    var reqObj = req.query;
    var dataArray = xlsx.parse("./data/"+reqObj.dataSourceName+".xlsx");
    var attachDataArray = xlsx.parse("./attachData/"+reqObj.dataSourceName+".xlsx");
    //取sheet1中的数据，list是一个二维数组
    var list = dataArray[0].data;
    var attachList = attachDataArray[0].data;
    //console.log(attachList);
    var responseData = {};
    responseData.mainData = []; //主要数据
    responseData.attachData = []; //附加数据，用于增加个别人员的权重
    for(var i= 1;i<list.length;i++) {
        var rowObj = {};
        rowObj.id = i
        rowObj.name = list[i][1];
        rowObj.department = list[i][3];
        rowObj.specialty = list[i][4];
        rowObj.jobTitle = list[i][5];
        rowObj.mobile = list[i][2];
        responseData.mainData.push(rowObj);
    }
    for(var i= 1;i<attachList.length;i++) {
        var attachRowObj = {};
        attachRowObj.id = i
        attachRowObj.name = attachList[i][1];
        attachRowObj.department = attachList[i][3];
        attachRowObj.specialty = attachList[i][4];
        attachRowObj.jobTitle = attachList[i][5];
        attachRowObj.mobile = attachList[i][2];
        responseData.attachData.push(attachRowObj);
    }
    res.writeHead(200,{"Content-Type":'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    res.end(JSON.stringify(responseData));
 
});

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});
