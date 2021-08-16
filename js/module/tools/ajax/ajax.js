let _url = "http://127.0.0.1:81/getData";
window.$ajax = function(config={}){
	config.url = config.url || _url;
	config.method = config.method || "get";
	if(typeof(config) === "string"){
		config = {
			url: config,
			method: "get"
		}
	}
	if(config.hasOwnProperty("post")||config.hasOwnProperty("get")){
		console.log(1)
	}
	var xhr = new XMLHttpRequest();
	if(!config.url){
		return false;
	}
	xhr.open(config.method,config.url);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ){
			
			if(xhr.status == 200){
				console.log("服务器已响应");
				// console.log(typeof xhr.response)
				// document.write(xhr.response)
				let data = JSON.parse(xhr.response);
				document.write(data.data.pageProps.record.content.replace(/\r\n/gi,"<br/>"));
			}else{
				window.$message({
					type: "warning",
					message: "网络错误",
				})
			}
		}
	}
}