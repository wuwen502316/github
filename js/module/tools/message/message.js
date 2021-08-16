import icon from "../units/icon.js";
import { debounce, throttle } from "../debounceOrThrottle/index.js";
// console.log(debounce, throttle);
let flag = true;
let Message = class Message {
	constructor(options, name) {
		for (let k in options) {//对参数的for
			if (!options.hasOwnProperty(k)) {//如果不包含则跳出
				break;
			}
			this[k] = options[k];
			// console.log(!options.hasOwnProperty(k))
		}
		this.name = name || "message";//默认 是message方式
		this.className = null;//创建的dom元素的className
		this.messageBox = null;//创建的dom元素
		if (icon[this.type]) {//通过参数获取icon，默认为info图标
			this.type = this.type;
		} else {
			this.type = "info"
		}
		this.icon = icon[this.type]("20px");//默认icon为20px;
		if (typeof (this.duration) !== "number") {//duration
			throw new Error("duration不为number类型")
		} else if (this.duration > 0 && this.duration < 3000) {
			this.duration = 3000
		} else if (this.duration <= 0) {
			this.duration = 0;
			this.is_show_close = true;
		}
		if (flag && this.state === this.name) {//防止频繁点击
			this.init();
		}
	}
	init() {
		this.HTMLCODE = `<i style = "margin-right: 5px" class="icon-${this.type}">${this.icon}</i>
			<p class="el-message__content">
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;">${this.message}</font>
				</font>
			</p>
			${this.is_show_close ? `<i class="el-message__closeBtn">${icon.close("8px")}</i>` : `<!---->`}
			`;
		this.init_data();
	}
	init_data() {
		if (this.type) {
			this.className = `el-message el-message--${this.type}`;
			if (this.is_center) {
				this.className = `el-message el-message--${this.type} is-center`;
			}
		}
		this.create_element();
	}
	create_element() {
		this.messageBox = document.createElement("div");
		this.messageBox.className = this.className;
		this.messageBox.innerHTML = this.HTMLCODE;
		document.querySelector("body").appendChild(this.messageBox);
		this.closeBtn = this.messageBox.querySelector(".el-message__closeBtn");
		console.log("创建完成");
		this.setInfoStyle(); //设置messagebox的top
		this.setTimer(); //设置定时器，3s后消失，同时后面的messagebox同步上升
	}
	setInfoStyle() {
		// const str = `.el-message--${this.type}`;
		this.str = `.el-message`;
		let messageBoxs = document.querySelectorAll(this.str);
		let message_len = messageBoxs.length;
		this.messageBox.style.top = `${message_len === 1 ? this.style.top : (message_len - 1) * this.space + this.style.top}px`;
	}
	remove_setStyle() {
		this.remove_messagebox(); //赋值className开启动画，并监听transitionend是否完成
		this.setAllMessageBoxStyle();
	}
	setTimer() {
		if (this.duration) {
			this.timer = setTimeout(() => {
				this.remove_setStyle();
			}, this.duration)
			console.log("定时器开启");
		}
		//添加click监听
		//点击后; 1、关闭定时器2、同步top同步上升
		if (this.is_show_close) {
			this.closeBtn.onclick = (e) => {
				if (this.duration) clearTimeout(this.timer);
				this.remove_setStyle();
			}
		}
	}
	remove_messagebox() {
		// let all_message_info = document.querySelectorAll(".el-message--info");
		let message_box = this.messageBox;
		message_box.style.top = parseFloat(getComputedStyle(this.messageBox).top) - this.space + "px";
		message_box.style.opacity = 0;
		// this.setAllMessageBoxStyle();//设置后面的messagebox同步上升
		let remove_ele = () => { //回调函数执行后删除元素
			document.querySelector("body").removeChild(this.messageBox);
			console.log("已移除");
		}
		this.eventListener(remove_ele);
	}
	eventListener(cb) {
		let _flag = false;
		this.messageBox.addEventListener("transitionend", (e) => {
			if (e.target === this.messageBox && !_flag) {
				_flag = true;//css中一个值完成transform后不再执行，以免多次执行
				flag = true;
				cb();
			}
		})//监听transitionend是否完成，否flag = false; 是 flag = true;
	}
	setAllMessageBoxStyle() {
		let messageBoxs = document.querySelectorAll(this.str);//获取所有el-message节点
		let preMessageBoxs = [];
		for (let i = messageBoxs.length - 1; i >= 0; i--) {
			if (messageBoxs[i] == this.messageBox) {
				break;
			}
			preMessageBoxs.unshift(messageBoxs[i]);
		}
		let startlen = preMessageBoxs.length;
		flag = false;
		// throw new Error("请勿频繁点击");
		for (let i = 0; i < startlen; i++) {
			preMessageBoxs[i].classList.add("el-mssage-info-step-move");
			preMessageBoxs[i].style.top = parseFloat(getComputedStyle(preMessageBoxs[i]).top) - this.space + "px";
		}
		let t = setTimeout(() => {
			// const str = `.el-message--${this.type}`;
			// const str = `.el-message`;
			let endlen = preMessageBoxs.length;
			for (let i = 0; i < startlen; i++) {
				if (preMessageBoxs[i] !== undefined) {
					console.log("同步上移完成");
					preMessageBoxs[i].classList.remove("el-mssage-info-step-move");
				}
			}
			clearTimeout(t);
		}, 300)
	}
}
let _message = function (options = {}) {
	// 可以只传入message的值（字符串）
	if (typeof options === "string") {
		options = {
			message: options
		}
	}
	options = Object.assign({
		state: "message",
		type: "info",
		message: "默认信息",
		duration: 3000,
		is_center: false,
		is_show_close: false,
		position: "right",
		style: {
			top: 20
		},
		space: 70
	}, options)
	return new Message(options)
}
export {
	_message,
	Message
};