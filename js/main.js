$(document).ready(function() {
	var window_height = $(window).height();
	//设置内容区域高度
	$(".main-container").height(window_height - 55);
	$("#welcomePage").height(window_height - 55 -40);
	//设置表格区域高度
	$("#dataContent").height(window_height - 155);
	$("#resultContent").height(window_height - 155);
	$("#dataTable_div").height(window_height - 190);
	$("#resultTable_div").height(window_height - 190);
	var clickOption = "";  //当前点击菜单选项
	var sampleData = [];  //定义样本数据
	var attachSampleData = []; //定义附加样本数据，用于增加权重
	var marquee;  //定义动画对象
	var resultData = []; //定义随机抽取数据
	pdfMake.fonts = {
       	weiruanyahei: {
 	   	normal: 'msyh.ttf',
       	bold: 'msyh.ttf',
      	italics: 'msyh.ttf',
      	bolditalics: 'msyh.ttf'
	   }
	};
	//console.log(getCookie("uname"));
	var loginName = getCookie("uname");
	var loginPwd = getCookie("upwd");
	console.log(loginName + "and" + loginPwd);
	if(loginName != "admin" || loginPwd != "666666") {
		alert("请先登录！");
		window.close();
	}
	getNowDate();
	/*点击左侧不同菜单触发执行不同的流程*/
	$(".nav-list .submenu").on('click', 'a', function(){
		$("#sampleNumber").val(''); //抽取表单致空
		clickOption = $(this).text();
		switch (clickOption) {
			case "文艺演出":
				closeWelcomePage();
				changeTitle(clickOption);
				getData("wyyc");
				break;
			case "新闻出版":
				closeWelcomePage();
				changeTitle(clickOption);
				getData("xwcb");
				break;
			default:
				alert("其他");
		}
	});
	/*点击‘开始抽取’按钮触发*/
	$("#btn_getRandomData").on('click', function(e) {
		e.preventDefault();
		var randomNumber = $("#sampleNumber").val();
		//alert(randomNumber);
		resultData = getArrayItems(sampleData, randomNumber, attachSampleData);
		//console.log(resultData);
		initResultTable(resultData);
	});
	/*点击‘PDF打印’触发*/
	$("#printPDF").on('click', function() {
		/*将抽取结果数据转换问表格格式的数据*/
		var extractingTime = getNowFormatDate();
		var pdfData = [];
		var headerRow = ["编号", "专家姓名", "联系方式", "所在单位", "专业领域", "职务"];
		var dataRow;
		var name, mobile, department, specialty, jobTitle;
		pdfData.push(headerRow);
		for(var i=0;i<resultData.length;i++) {
			name = resultData[i].name ? resultData[i].name : "";
			mobile = resultData[i].mobile ? resultData[i].mobile : "";
	        department = resultData[i].department ? resultData[i].department : "";
	        specialty = resultData[i].specialty ? resultData[i].specialty : "";
	        jobTitle = resultData[i].jobTitle ? resultData[i].jobTitle : "";
			dataRow = [];
			dataRow.push(i+1);
			dataRow.push(name);
			dataRow.push(mobile);
			dataRow.push(department);
			dataRow.push(specialty);
			dataRow.push(jobTitle);
			pdfData.push(dataRow);
		}
		var docDefinition = { 
			content: [
			    // if you don't need styles, you can use a simple string to define a paragraph
			    {
			    	text: '2017年北京市文化创意产业发展专项项目基金评审专家随机抽取系统',
			    	style: 'header'
			    },
			    {
			    	text: clickOption + '组  已抽取专家名单结果         （抽取时间：' + extractingTime + '）',
			    	style: 'subheader'
				},
			    {
					style: 'tableExample',
					table: {
						widths: [25, 40, 55, '*', 125, 120],
						body: pdfData
					},
					layout: {
						fillColor: function (i, node) { 
							if(i == 0) {
								return '#CCCCCC';
							} else {
								return null;
							}
						}
					}
				},
				{
					text: '现场人员签字：',
					style: 'footer'
				}
			],
			styles: {
				header: {
					fontSize: 16,
					bold: true,
					margin: [0, 0, 0, 25],
					alignment: 'center'
				},
				subheader: {
					fontSize: 12,
					bold: false,
					margin: [0, 0, 0, 5],
				},
				tableExample: {
					fontSize: 10,
					bold: false
				},
				tableHeader: {
					bold: false,
					fontSize: 13,
					color: 'black'
				},
				footer: {
					fontSize: 12,
					bold: false,
					margin: [0, 10, 0, 0]
				}
			},
			defaultStyle: {
			    font: 'weiruanyahei'
		    } 
		};
		pdfMake.createPdf(docDefinition).download();
		//pdfMake.createPdf(docDefinition).open();
		//pdfMake.createPdf(docDefinition).print();
	});
	/*关闭当前页面时触发*/
	/*$(window).bind("beforeunload", function() {
		alert("关闭页面");
		delCookie("uname");
		delCookie("upwd");
		return '您输入的内容尚未保存，确定离开此页面吗？';
	});*/

	/*$(".navbar-brand").on('click', function() {
		$("#dataPage").hide();
		$("#welcomePage").show();
	});*/
	/*获取当前日期*/
	function getNowDate() {
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth() + 1;
		var day = nowDate.getDate();
		var today = year + '年' + month + '月' + day + '日';
		$("#nowDate").text(today);
	}

	/*关闭欢迎页打开收取页*/
	function closeWelcomePage() {
		$("#welcomePage").hide();
		$("#dataPage").show();
	}

	function changeTitle(newTitle) {
		$(".home-title").text(newTitle);
	}
	/*更新数据表格人数*/
	function updateTotalNumber(totalNumber) {
		var newTotalNumber = "专家名单（共" + totalNumber + "人）";
		$("#dataTitle").text(newTotalNumber);
	}
	/*获取数据*/
	function getData(dataSourceName) {
		$.ajax({
			url: 'http://127.0.0.1:8081/getdata?dataSourceName='+dataSourceName,
			type: 'GET',
			success: function(data) {
				sampleData = data.mainData;
				attachSampleData = data.attachData;
				//console.log(data);
				initTable(data.mainData);
				updateTotalNumber(data.mainData.length);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
			    var s1=XMLHttpRequest;
			    var s2=textStatus;
			    var s3=errorThrown;
			    alert("error message : "+errorThrown.toString())
		    },
		});
	}
	/*创建数据源表格*/
	function initTable(data) {
		$("#dataTable").empty();
		$("#resultTable").empty();
		var tbBody = "";
		var name, department, specialty, jobTitle;
		for(var i=0;i<data.length;i++) {
			var trColor;
	        if (i % 2 == 0) {
	            trColor = "even-tr";
	        }
	        else {
	            trColor = "odd-tr";
	        }
	        name = data[i].name ? data[i].name : "";
	        department = data[i].department ? data[i].department : "";
	        specialty = data[i].specialty ? data[i].specialty : "";
	        jobTitle = data[i].jobTitle ? data[i].jobTitle : "";

	        tbBody += "<tr class='" + trColor + "'><td width='10%'>" + data[i].id + "</td>" + "<td width='10%'>" + name + "</td>" + "<td width='30%'>" + department + "</td>" + "<td width='25%'>" + specialty + "</td>" + "<td width='25%'>" + jobTitle + "</td></tr>";
		}
		$("#dataTable").append(tbBody);
		/*if(marquee) {
			return;
		}*/
		//marquee = new Marquee({ ID: "dataTable_div", Direction: "top", Step: 2, Width: 0, Height: 500, Timer: 50, DelayTime: 0, WaitTime: 0, ScrollStep: 80  });
	}
	/*随机抽取函数*/
	function getArrayItems(arr, num, attachArr) {
	    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
	    var temp_array = new Array();
	    /*var index;
	    for (index in arr) {
	        temp_array.push(arr[index]);
	    }*/
	    for(var i=0; i<arr.length; i++) {
	    	//debugger;
	    	temp_array.push(arr[i]);
	    }
	    //console.log(attachArr);
	    //console.log(temp_array);

	    var temp_array_attach = temp_array.concat(attachArr);
	    //debugger;
	    //console.log(arr);
	    var isExistFlag = false;
	    //取出的数值项,保存在此数组
	    var return_array = new Array();
	    for (var i = 0; i<num; i++) {
	        //判断如果数组还有可以取出的元素,以防下标越界
	        if (temp_array_attach.length>0) {
	            //在数组中产生一个随机索引
	            var arrIndex = Math.floor(Math.random()*temp_array_attach.length);
	            //如果返回的数组中已经存在当前项则跳出，继续下一步
	            isExistFlag = isExist(return_array, temp_array_attach[arrIndex]);

	            if(!isExistFlag) {
	            	//将此随机索引的对应的数组元素值复制出来
		            return_array[i] = temp_array_attach[arrIndex];
		            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
		            temp_array_attach.splice(arrIndex, 1);
	            }else {
	            	//然后删掉此索引的数组元素,这时候temp_array变为新的数组
	            	temp_array_attach.splice(arrIndex, 1);
	            	i--;
	            }
	            
            	//将此随机索引的对应的数组元素值复制出来
	           // return_array[i] = temp_array_attach[arrIndex];
	            
	            
	            
	        } else {
	            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
	            break;
	        }
	    }
	    return return_array;
	}
	/*判断当前数组中是否已经存在该元素*/
	function isExist(arr, item) {
		var isExistFlag = false;
		for (var i=0;i<arr.length;i++) {
			if(item.name == arr[i].name) {
				isExistFlag = true;
				break;
			}
		}
		return isExistFlag;
	}

	/*创建随机抽取结果表格*/
	function initResultTable(data) {
		$("#resultTable").empty();
		var tbBody = "";
		var trColor = "";
		var i = 0;
		var hasSelectedInfo = '';
		var name, department, specialty, jobTitle;
		var int = setInterval(function() {
			if(i<data.length) {
				if (i % 2 == 0) {
		            trColor = "even-tr";
		        }
		        else {
		            trColor = "odd-tr";
		        }
		        name = data[i].name ? data[i].name : "";
	        	department = data[i].department ? data[i].department : "";
	        	specialty = data[i].specialty ? data[i].specialty : "";
	        	jobTitle = data[i].jobTitle ? data[i].jobTitle : "";
		        tbBody = "<tr id='tr" +i + "' class='" + trColor + "'><td width='15%'>" + name + "</td>" + "<td width='35%'>" + department + "</td>" + "<td width='30%'>" + specialty + "</td>" + "<td width='20%'>" + jobTitle + "</td></tr>";
	        	$('#resultTable').append(tbBody);
	        	var hasSelectedNum = i+1;
	        	hasSelectedInfo = "（已抽取：" + hasSelectedNum + "人）";
	        	$('#hasSelected').text(hasSelectedInfo);
	        	i++;

			}else {
				int=window.clearInterval(int)
				alert("抽取完成");
			}
		}, 1000);
		
	}
	/*读取cookies*/ 
	function getCookie(name){ 
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	    if(arr=document.cookie.match(reg))
	        return unescape(arr[2]); 
	    else 
	        return null; 
	} 
	/*删除cookies*/ 
	function delCookie(name) { 
	    var exp = new Date(); 
	    exp.setTime(exp.getTime() - 1); 
	    var cval=getCookie(name); 
	    if(cval!=null) 
	        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
	}
	/*获取当前时间*/
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	}

});