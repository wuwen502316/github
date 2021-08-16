import icon from "../units/icon.js";
import {Message} from "../message/message.js";


class Notify extends Message {
	constructor(options) {
		super(options, "notify");
	}
	init(){
		this.HTMLCODE =  `<i style = "margin-right: 5px">${this.icon}</i>
			<div class="el-notification__group">
				<h2 class="el-notification__title">${this.title}</h2>
				<div class="el-notification__content">
					<p>${this.message}</p>
				</div>
				<div class="el-notification__closeBtn"></div>
			</div>
			${this.is_show_close?`<i class="el-message__closeBtn">${icon.close("12px")}</i>`:`<!---->`}
			`
		this.init_data();
	}
	setInfoStyle(){
		this.str = `.el-notification`;
		let messageBoxs = document.querySelectorAll(this.str);
		let message_len = messageBoxs.length;
		this.messageBox.style.top =
			`${message_len === 1 ? this.style.top : (message_len-1)*this.space + this.style.top}px`;
	}
	create_element() {
		this.messageBox = document.createElement("div");
		this.messageBox.className = `el-notification right`;
		this.messageBox.setAttribute("role","alert")
		this.messageBox.innerHTML = this.HTMLCODE;
		document.querySelector("body").appendChild(this.messageBox);
		this.closeBtn = this.messageBox.querySelector(".el-message__closeBtn");
		console.log("创建完成");
		this.setInfoStyle(); //设置mwssagebox的top
		this.setTimer(); //设置定时器，3s后消失，同时后面的messagebox同步上升
	}
}
let notify = (options = {}) => {
	// 可以只传入message的值（字符串）
	if (typeof options === "string") {
		options = {
			message: options
		}
	}
	options = Object.assign({
		state: "notify",
		type: "info",
		message: "默认信息",
		duration: 3000,
		is_center: false,
		is_show_close: false,
		title:"title",
		style: {
			top: 20
		},
		space: 100
	}, options)
	return new Notify(options);
}
export default notify

