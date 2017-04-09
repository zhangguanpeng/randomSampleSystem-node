
var http = require("http");
var fs = require("fs");
var xlsx = require("node-xlsx");

var str='{"id":"123",name:"jack",arg:11111}';

function onRequest(request, response){
    console.log("Request received.");
    console.log(request);
    /*发送 HTTP 头部 
	HTTP 状态值: 200 : OK
	内容类型: text/plain*/
    /*response.writeHead(200,{
		'Content-Type': 'text/plain',
		'charset': 'utf-8',
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'
	});*///可以解决跨域的请求
    response.writeHead(200,{
        'Content-Type': 'text/plain',
        'Content-Type':'application/json', 
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'
    });
    //response.write("Hello World 8888\n");
    var datLlist = xlsx.parse("./data/testData.xlsx");
    console.log(datLlist[0].data[0][2]); 
    //str=fs.readFileSync('data.txt');
    //发送响应数据str
    response.write(datLlist);
    response.end();
}

http.createServer(onRequest).listen(8888);
// 终端打印如下信息
console.log("Server has started.port on 8888\n");
console.log("test data: "+str.toString());