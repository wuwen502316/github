//仓库
//存储一些公共的变量


let muneCreated = false;
let muneList = document.querySelector(".navMenu");

const callback = function (mutations) {
	mutations.forEach(function (mutation) {
		console.log(mutation);
	})
	console.log(mutations);
}
const config = {
	childList: true,
	attributes: true
}
let observe = new MutationObserver(callback);
observe.observe(muneList, config)
let data = {
	muneCreated: muneCreated,
	muneList: muneList
}

let store = new Proxy(data, {
	set: function (target, key, receiver) {
		console.log(`${key}设置为${receiver}`);
		return Reflect.set(target, key, receiver);
	},
	get: function (target, key, receiver) {
		console.log(`${key}被读取了`);
		return Reflect.get(target, key, receiver);
	}
})

export default store