//长度必须在6~20位之间
//开头不能为数字
//只能包含小写字母和数字
//数字：48~57
//小写字母：97~122
//innerHTML
function fnLogin(){
	var oUname = document.getElementById("uname");
	var oUpass = document.getElementById("upass");
	var oError = document.getElementById("error_box");
	var isNotError = true;

	var username = "admin";
	var password = "666666";
	if(oUname.value.length > 20 || oUname.value.length < 5){
		oError.innerHTML = "用户名长度必须在5~20位之间";
		isNotError = false;
		return;
		
	}else if(oUname.value.charCodeAt(0) >= 48 && oUname.value.charCodeAt(0) <= 57){
		oError.innerHTML = "用户名开头不能为数字";
		isNotError = false;
		return;
	}else{
		for(var i=0; i<oUname.value.length; i++){
			if((oUname.value.charCodeAt(i) > 122 || oUname.value.charCodeAt(i) < 97) && (oUname.value.charCodeAt(i) > 57 || oUname.value.charCodeAt(i) < 48)){
				oError.innerHTML = "用户名只能包含小写字母和数字";
				isNotError = false;
				return;
			}
		}
	}
	if(oUpass.value.length > 20 || oUpass.value.length < 6){
		oError.innerHTML = "密码长度必须在6~20位之间";
		isNotError = false;
		return;
	}
	if(oUname.value == username && oUpass.value == password) {
		oError.innerHTML = "登录成功";
		setCookie("uname", username);
		setCookie("upwd", password);
		window.location.href = 'main.html';
		return;
	}
	oError.innerHTML = "登录用户名或密码错误成功";
}

//写cookies 
function setCookie(name,value){ 
    var Days = 1; //设置有效天数
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*5*60*60*1000); //天，小时，分钟，秒，毫秒
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 
