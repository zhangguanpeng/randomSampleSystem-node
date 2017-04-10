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
			//dataType: 'JSON',
			success: function(data) {
				console.log(data);
				$("#content").empty();
				//$("#content").text(data);
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
		var trs = [];
		for(var i=0;i<data.lenth;i++) {
			var td1 = '<td>' + data[i].id + '</td>';
			var td2 = '<td>' + data[i].name + '</td>';
			var td3 = '<td>' + data[i].department + '</td>';
			var td4 = '<td>' + data[i].specialty + '</td>';
			var td5 = '<td>' + data[i].jobTitle + '</td>';
			var tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + '</tr>';
			trs.push(tr);
		}
		$("#dataTable tbody").append(trs);
	}
});