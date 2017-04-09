$(document).ready(function() {
	$(".nav-list .submenu").on('click', 'a', function(){
		//alert($(this).text());
		var clickOption = $(this).text();
		switch (clickOption) {
			case "文艺演出":
				alert("文艺演出");
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
			url: 'http://127.0.0.1:8081/',
			type: 'GET',
			//dataType: 'JSON',
			success: function(data) {
				console.log(data);
				$("#content").empty();
				$("#content").text(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
			    var s1=XMLHttpRequest;
			    var s2=textStatus;
			    var s3=errorThrown;
			    alert("error message : "+errorThrown.toString())
		    },
		});
	}

});