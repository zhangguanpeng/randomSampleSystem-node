$(document).ready(function() {
	//设置内容区域高度
	$(".main-container").height($(window).height() - 55);


	$(".nav-list .submenu").on('click', 'a', function(){
		//alert($(this).text());
		var clickOption = $(this).text();
		switch (clickOption) {
			case "文艺演出":
				//alert("文艺演出");
				getData("文艺演出");
				break;
			case "新闻出版":
				alert("新闻出版");
				break;
			default:
				alert("其他");
		}
	});

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
		var thead = "<tr><th>编号</th><th>姓名</th><th>单位</th><th>专长</th><th>职务</th></tr>";
		var tbBody = "";
		for(var i=0;i<data.length;i++) {
			var trColor;
	        if (i % 2 == 0) {
	            trColor = "even-tr";
	        }
	        else {
	            trColor = "odd-tr";
	        }
	        tbBody += "<tr class='" + trColor + "'><td>" + data[i].id + "</td>" + "<td>" + data[i].name + "</td>" + "<td>" + data[i].department + "</td>" + "<td>" + data[i].specialty + "</td>" + "<td>" + data[i].jobTitle + "</td></tr>";
		}
		$("#dataTable").append(thead);
		$("#dataTable").append(tbBody);
	}
});