import {_message} from "./tools/message/message.js";
import notify from "./tools/notify/notify.js";
import {confirm} from "./tools/confirm/confirm.js";
import icon from "./tools/units/icon.js";
import asideData from "./tools/units/aisdeData.js";
import handleClass from "./tools/handleClass/handleClass.js";
import handleAnimation from "./tools/handleAnimation/handleAnimation.js";
import detailNavList from "../createMenu.js";

// console.log(handleAnimation);
let tools = {
	$message:_message,
	icon:icon,
	$notify:notify,
	$confirm:confirm,
	handleClass:handleClass,
	handleAnimation:handleAnimation
}
window.tools = tools;
// window.tools.asideData = asideData;
// console.log(tools)
if(asideData.code == 200){
	let data = asideData.data;
	detailNavList.init(data);
}
