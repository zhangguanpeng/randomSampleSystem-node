$(document).ready(function() {
	var window_height = $(window).height();
	//设置内容区域高度
	$(".main-container").height(window_height - 55);
	//设置表格区域高度
	$("#dataContent").height(window_height - 155);
	$("#resultContent").height(window_height - 155);
	$("#dataTable_div").height(window_height - 190);
	$("#resultTable_div").height(window_height - 190);
	var sampleData = [];  //定义样本数据
	var marquee;  //定义动画对象
	/*点击左侧不同菜单触发执行不同的流程*/
	$(".nav-list .submenu").on('click', 'a', function(){
		$("#sampleNumber").val(''); //抽取表单致空
		var clickOption = $(this).text();
		switch (clickOption) {
			case "文艺演出":
				//alert("文艺演出");
				changeTitle(clickOption);
				getData("文艺演出");
				break;
			case "新闻出版":
				//alert("新闻出版");
				changeTitle(clickOption);
				break;
			default:
				alert("其他");
		}
	});
	/*点击‘开始抽取’按钮触发*/
	$("#btn_getRandomData").on('click', function() {
		var randomNumber = $("#sampleNumber").val();
		var resultData = getArrayItems(sampleData, randomNumber);
		initResultTable(resultData);
	});

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
			url: 'http://127.0.0.1:8081/getdata',
			type: 'GET',
			success: function(data) {
				sampleData = data;
				initTable(data);
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
		var tbBody = "";
		for(var i=0;i<data.length;i++) {
			var trColor;
	        if (i % 2 == 0) {
	            trColor = "even-tr";
	        }
	        else {
	            trColor = "odd-tr";
	        }
	        tbBody += "<tr class='" + trColor + "'><td width='10%'>" + data[i].id + "</td>" + "<td width='10%'>" + data[i].name + "</td>" + "<td width='30%'>" + data[i].department + "</td>" + "<td width='30%'>" + data[i].specialty + "</td>" + "<td width='20%'>" + data[i].jobTitle + "</td></tr>";
		}
		$("#dataTable").append(tbBody);
		if(marquee) {
			return;
		}
		marquee = new Marquee({ ID: "dataTable_div", Direction: "top", Step: 2, Width: 0, Height: 500, Timer: 50, DelayTime: 0, WaitTime: 0, ScrollStep: 80  });
	}
	/*随机抽取函数*/
	function getArrayItems(arr, num) {
	    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
	    var temp_array = new Array();
	    for (var index in arr) {
	        temp_array.push(arr[index]);
	    }
	    //取出的数值项,保存在此数组
	    var return_array = new Array();
	    for (var i = 0; i<num; i++) {
	        //判断如果数组还有可以取出的元素,以防下标越界
	        if (temp_array.length>0) {
	            //在数组中产生一个随机索引
	            var arrIndex = Math.floor(Math.random()*temp_array.length);
	            //将此随机索引的对应的数组元素值复制出来
	            return_array[i] = temp_array[arrIndex];
	            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
	            temp_array.splice(arrIndex, 1);
	        } else {
	            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
	            break;
	        }
	    }
	    return return_array;
	}
	/*创建随机抽取结果表格*/
	function initResultTable(data) {
		$("#resultTable").empty();
		var tbBody = "";
		var trColor = "";
		var i = 0;
		var int = setInterval(function() {
			if(i<data.length) {
				if (i % 2 == 0) {
		            trColor = "even-tr";
		        }
		        else {
		            trColor = "odd-tr";
		        }
		        tbBody = "<tr id='tr" +i + "' class='" + trColor + "'><td width='10%'>" + data[i].id + "</td>" + "<td width='10%'>" + data[i].name + "</td>" + "<td width='30%'>" + data[i].department + "</td>" + "<td width='30%'>" + data[i].specialty + "</td>" + "<td width='20%'>" + data[i].jobTitle + "</td></tr>";
	        	$('#resultTable').append(tbBody);
	        	i++;

			}
		}, 1000);
		
	}

});