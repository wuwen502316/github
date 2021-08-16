var util = {
	//获取路由的路径和详细参数
	getParamsUrl: function() {
		var hashDeatail = location.hash.split("?"),
			hashName = hashDeatail[0].split("#")[1], //路由地址
			params = hashDeatail[1] ? hashDeatail[1].split("&") : [], //参数内容
			query = {};
		for (var i = 0; i < params.length; i++) {
			var item = params[i].split("=");
			query[item[0]] = item[1]
		}
		return {
			path: hashName,
			query: query,
			params: params
		}
	},
	// 闭包返回函数
	closure(name) {
		function fun(currentHash) {
			window.name&&window[name](currentHash)
		}
		return fun;
	},
	// 生成不同的 key 
	genKey() {
		var t = 'xxxxxxxx'
		return t.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0
			var v = c === 'x' ? r : (r & 0x3 | 0x8)
			return v.toString(16)
		})
	},
	hasClass: function(elem, cls) {
		cls = cls || '';
		if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
		return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
	},
	addClass: function(ele, cls) {
		if (!util.hasClass(ele, cls)) {
			ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
		}
	},
	removeClass(elem, cls) {
		if (util.hasClass(elem, cls)) {
			var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
			while (newClass.indexOf(' ' + cls + ' ') >= 0) {
				newClass = newClass.replace(' ' + cls + ' ', ' ');
			}
			elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	}
}
function Router() {
	this.routes = {}; //保存注册的所有路由
	this.beforeFun = null; //切换前
	this.afterFun = null; // 切换后
	this.routerViewId = "#app"; // 路由挂载点 
	this.redirectRoute = null; // 路由重定向的 hash
	this.stackPages = true; // 多级页面缓存
	this.routerMap = ["#/index"]; // 路由遍历
	this.historyFlag = '' // 路由状态，前进，回退，刷新
	this.history = []; // 路由历史
	this.animationName = "fade"
}
Router.prototype = {
	init(config){
		this.routerMap = config ? config.routes : this.routerMap;
		this.routerViewId = config ? config.routerViewId : this.routerViewId;
		this.stackPages = config ? config.stackPages : this.stackPages;
		const name = document.querySelector(this.routerViewId);
		if (name) {
		    this.animationName = name;
		}
		// this.animationName = config ? config.animationName : this.animationName;
		if (this.routerMap.length) {
		    let selector = this.routerViewId + " .page";
		    let pages = document.querySelectorAll(selector);
			console.log(selector,pages)
		    for (let i = 0; i < pages.length; i++) {
		        let page = pages[i];
		        let hash = page.getAttribute('data-hash');
		        let name = hash.substr(1);
				console.log(page,hash,name)
		        let item = {
		            path: hash,
		            name: name,
		            callback: util.closure(name)
		        }
		        this.routerMap.push(item);
		    }
		}
		// 初始化跳转方法
		window.linkTo = function(path) {
		    console.log('path :', path)
		    if (path.indexOf("?") !== -1) {
		        window.location.hash = path + '&key=' + util.genKey()
		    } else {
		        window.location.hash = path + '?key=' + util.genKey()
		    }
		}
	}
}
window.routers = new Router();