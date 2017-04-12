/*左侧菜单折叠*/
var $li = $(".sidebar li:has(ul)");
var slideFlag = true;
$li.children("a").on("click", function() {
	
	if(slideFlag) {
		$(this).parent().children("ul").slideUp();
		$(this).children("b").removeClass("glyphicon-menu-up");
		$(this).children("b").addClass("glyphicon-menu-down");
		slideFlag = false;
	}else{
		$(this).parent().children("ul").slideDown();
		$(this).children("b").removeClass("glyphicon-menu-down");
		$(this).children("b").addClass("glyphicon-menu-up");
		slideFlag = true;
	}
});