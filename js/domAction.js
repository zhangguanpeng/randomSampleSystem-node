$(document).ready(function() {
	var window_height = $(window).height();
	//设置内容区域高度
	$(".main-container").height(window_height - 55);
	//设置表格区域高度
	$("#dataContent").height(window_height - 145);
	$("#dataTable_div").height(window_height - 180);
	//$("#resultTable").height(window_height - 145);
	var marquee;
	$(".nav-list .submenu").on('click', 'a', function(){
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

	function changeTitle(newTitle) {
		$(".home-title").text(newTitle);
	}

	function updateTotalNumber(totalNumber) {
		var newTotalNumber = "专家名单（共" + totalNumber + "人）";
		$("#dataTitle").text(newTotalNumber);
	}

	function getData(dataSourceName) {
		$.ajax({
			url: 'http://127.0.0.1:8081/getdata',
			type: 'GET',
			success: function(data) {
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

});