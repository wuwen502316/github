let reg = {
	elementReg(data){
		if(typeof data){
			return typeof(HTMLElement) === "object" ? data instanceof HTMLElement : data && data.nodeType === 1 && typeof(data.nodeName) === "string";
		}
		return false;
	},
	_typeof(data,deep=false){
		//deep默认返回值eg:string,object,number，不区分[],{}
		//true时，区分[],{},new Function(){}
		var str = typeof(data);
		if(!deep){
			return str;
		}else{
			str = str=="object" ? Object.prototype.toString.call(data) : str;
			return str;
		}
	},
	firstWordToUpperCase(str){//首字母大写
		var arr = [];
		var list = str.split(" ");
		for(let i = 0; i<list.length;i++){
			let starWord = list[i].substring(0,1).toUpperCase();
			let str = list[i].substring(1);
			arr.push(starWord+str);
		}
		str = arr.join().replace(","," ");
		return str;
	},
	getEle(el){
		if(typeof el === "string"){
			var arrList = document.querySelectorAll(el);
			if(arrList.length>0){
				return arrList
			}else{
				return false;
			}
		}
	}
}
let HandleClass = {
	pbulicPart:function(element,config,callback){
		//element元素(允许是class||id||直接为单个dom),config是className(string||array),
		var elementArr = [];//元素的集合,length>=0
		var classListArr = [];
		if(reg.elementReg(element) || typeof(element)==="string"){
			//判断element的值typeof string or array
			//允许element为string(class||id)类型或者是元素||元素数组
			if(reg.elementReg(element)){
				elementArr = new Array(element);
			}
			elementArr = typeof(element)==="string"?reg.getEle(element):elementArr;
			
			//对config进行处理
			if(typeof(config) === "string"){
				classListArr = config.split(" ");
			}else if(config instanceof Array){
				classListArr = config;
			}else{
				return false;
			}
			// console.log(elementArr,classListArr)
			//对每一个元素添加||删除||替换className
			if(callback && elementArr){
				callback(elementArr,classListArr);
			}else{
				return false;
			}
		}else{
			return {
				msg:false,
				param:[element,config]
			}
		}
		return true;
	},
	addClass(element,config){
		this.pbulicPart(element,config,function(elementArr,classListArr){
			//对每一个元素添加className
			for(let i = 0; i<elementArr.length; i++){//元素
				let el = elementArr[i];
				for(let k = 0; k<classListArr.length; k++){
					if(el === "svg"||elementArr[i] === "path"){
						el.classList.value.add(classListArr[k]);
					}else{
						el.classList.add(classListArr[k]);
					}
				}
			}
		})
	},
	replaceClass(element,replacedClass,classNames){
		if(typeof(replacedClass)==="string" && typeof(classNames)==="string"){
			this.removeClass(element,replacedClass);
			this.addClass(element,classNames);
			return true;
		}else{
			return false;
		}
	},
	removeClass(element,config){
		this.pbulicPart(element,config,function(elementArr,classListArr){
			//对每一个元素删除className
			for(let i = 0; i<elementArr.length; i++){//dom
				let el = elementArr[i];
				for(let k = 0; k<classListArr.length; k++){//className
					if(el === "svg"||elementArr[i] === "path"){
						if(el.className.includes(classListArr[k])){
							el.classList.value.remove(classListArr[k]);
						}
					}else{
						el.classList.remove(classListArr[k]);
					}
				}
			}
		})
	}
}
function hc(){//禁止pbulicPart被直接使用
	for(let k in HandleClass){
		if(k!="pbulicPart"){
			this[k] = HandleClass[k]
		}
	}
}
hc.prototype = {
	pbulicPart:HandleClass.pbulicPart
}
let handleClass = new hc();
export default handleClass
