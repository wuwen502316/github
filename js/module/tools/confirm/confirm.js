let str = ` 
	<div class="el-message-box">
		<div class="el-message-box__header">
			<div class="el-message-box__title">title</div>
			<div class="el-message-box__headerbtn el-message-cancle">X</div>
		</div>
		<div class="el-message-box__content">content</div>
		<div class="el-message-box__btns">
			<button type="button" class="el-button el-button--default el-button--small handle-cancels">
				<span>取消</span>
			</button>
			<button type="button" class="el-button el-button--small el-button--primary btn-sure">
				<span>确定</span>
			</button>
		</div>
	</div>`
function Confirm(){
	this.messageBox = null;
	this.message = "";
	this.title = "";
	this.cancelButtonText = "取消";
	this.confirmButtonText = "确定";
	this.inputNum = {
		lenth:1,
		inputArray:[{
			title:"title",//input的,string
			placeholder:"placeholder",//input的placeholder值,string
			inputPattern:``,//通过什么js检测input输入的值是否合法,string
			layer:false,//是否检测输入值的合法性,boolean
			inputErrorMessage:"不合法"//如果不合法的提示
		}]
	}
}

Confirm.prototype = {
	init:function(config){
		this.createMessageBox();
	},
	createMessageBox(){
		this.messageBox = document.createElement("div");
		this.messageBox.className = "el-message-box__wrapper";
		this.messageBox.setAttribute("role","dialog");
		this.messageBox.innerHTML = str;
		document.querySelector("body").appendChild(this.messageBox);
		this.bindEvent();
	},
	cancelEvent(){
		return 1;
	},
	bindEvent(){
		this.cancelEvent();
		// handleCancel.onclick = messageCancle.onclick = P;
	}
}
let confirm = function(config){
	let P = new Promise((resolve,reject)=>{
		new Confirm().init();
		let handleCancel = document.querySelector(".handle-cancels");
		let messageCancle = document.querySelector(".el-message-cancle");
		handleCancel.onclick = messageCancle.onclick = ()=>{
			document.querySelector("body").removeChild(document.querySelector(".el-message-box__wrapper"));
			resolve(config.message)
		};
		
	})
	return P;
}
export {confirm}
