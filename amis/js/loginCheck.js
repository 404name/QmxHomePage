


function logout(){
	$('#logout')
		.modal({
			closable: false,
			onDeny: function() {
				return true;
			},
			onApprove: function() {
				localStorage.clear();
				checkLogin();
				return true;
			}
		})
	  .modal('show')
	;
}


function checkLogin() {
	if (localStorage.getItem("token") == null) {
		$("#notlogin").show();
		$("#login").hide();
		$('#checklogin')
		.modal({
			closable: false,
			onDeny: function() {
				window.alert('你仅能浏览部分内容');
				return true;
			},
			onApprove: function() {
				openWindow('http://127.0.0.1:9002/oauth/render/qq');
			}
		})
		.modal('show');
	}
	else{
		$("#notlogin").hide();
		var html = "";
		html += '<img class="ui right spaced avatar image" src="'+localStorage.getItem("headImg")+'">'+
			      localStorage.getItem("nickName") +
			    	'<i class="mail icon"></i> xx';
		console.log(html)
		$("#qqMsg").html(html);
		$("#login").show();
	}
}

/**
 * 封装一个居中打开新窗口的方法
 */
function openWindow(url, name, iWidth, iHeight) {
	iWidth = 500;
	iHeight = 400;
	var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
	var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
	var winObj = window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth +
		',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft +
		',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
	//循环监听，知道子页面啥时候关闭，只要关闭了就跳转到指定页面
	var loop = setInterval(function() {
		if (winObj.closed) {
			clearInterval(loop);
			localStorage.setItem("groupClass",0);
			window.location.href = "user.html";
		}
	}, 500);
}
