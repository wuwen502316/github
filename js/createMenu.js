// 根据data.js中的数据创建menu
//data.js为json格式


import store from "./store.js";
import icon from "./module/tools/units/icon.js";
function DetailNavList() {
	this.config = null;
	this.navList = null;
	this.data = null;
}
DetailNavList.prototype = {
	init(config) {// 初始化
		this.config = config;
		// console.log(this)
		for (let k in this.config) {
			if (!this.config.hasOwnProperty(k)) {
				break;
			}
			if (Object.prototype.toString.call(this.config[k]) === "[object Array]") {
				this.data = this.config[k];
				this.creatrNav(this.data);
			}
		}
	},
	createArrow: (data, iClassName, ArrowClassName, fontSize) => {//通过字符串模板处理数据，并返回
		if (data.childrens) {
			return `<i class="${iClassName}">${icon.arrow(`${fontSize}`, `${fontSize}`, `${ArrowClassName}`)}</i>`
		}
	},
	createFristClassNavArrow(options) {//第一级nav的箭头;options=data[i]
		const that = this;
		if (options.childrens) {
			return that.createArrow(options, "arrow fristClass-menu-arrow", "arrow-roll-begining arrow", 20,)
		} else {
			return ""
		}
	},
	createSecondClassNavUlLiItem(optionsItem, flag) {
		const html =
			`<div class="el-menu-item-group__title" style="padding-left:${20 + optionsItem.classNav * 5}px;
				${(() => { if (flag) { return "position:relative" } })()}">
				${(() => {
				if (optionsItem.icon) {
					return `<i class="arrow">${icon[optionsItem.icon]()}</i>`
				} else {
					return "<!---->"
				}
			})()}
						${(() => {
				if (optionsItem.navName && optionsItem.childrens) {
					return `<span>${optionsItem.navName}</span>
					<i class="arrow secondClass-menu-arrow">${icon.arrow(14, 14, "arrow-roll-begin")}</i>`
				} else {
					return "<!---->"
				}
			})()}
						${(() => {
				if (optionsItem.childrens) {
					return `<i class="arrow secondClass-menu-arrow">${icon.arrow(14, 14, "arrow-roll-begin")}</i>`
				} else {
					return "<!---->"
				}
			})()}
			</div>`
		return html;
	},
	createThirdClassNavUl(optionsItem, flag) {//第二级nav下的ul; options=data[i]
		if (flag) {
			return `<ul role="menu" class="el-menu el-menu--inline" style="display: block;">
		${function () {
					let child_3 = optionsItem.childrens;
					let HTML_3 = "";
					for (let item = 0; item < child_3.length; item++) {
						let str = `<li role="menuitem" tabindex="-1" class="el-menu-item"
					style="padding-left: ${20 + child_3[item].classNav * 5}px;">${child_3[item].navName}</li>`
						HTML_3 += str;
					}
					return HTML_3;
				}()}
		</ul>`
		} else {
			return "<!---->"
		}
	},
	createSecondClassNavUlLi(options) {//第二级nav下的ul>li; options=data[i]
		let HTML_2 = "";
		const len = options.length;
		let html = null;
		for (let item = 0; item < len; item++) {
			let optionsItem = options[item];
			let flag = false;
			if (optionsItem.childrens) {//判断是否有子元素
				flag = true;
				html = `<li class="el-menu-item-group">
				${this.createSecondClassNavUlLiItem(optionsItem, flag)}
				${this.createThirdClassNavUl(optionsItem, flag)}</li>`
				HTML_2 += html;
			} else {
				return "<!---->";
			}
		}
		return HTML_2
	},
	createSecondClassNavUl(options) {//options=data[i];第二级nav下的ul;
		const that = this;
		const child_2 = options.childrens;
		if (child_2) {
			return `<ul role="menu" class="el-menu el-menu--inline" style="display: none;">
				${that.createSecondClassNavUlLi(child_2)}
			</ul>`
		} else {
			return "<!---->"
		}
	},
	creatrNav(data) {//主函数,生成aside的dom树
		const that = this;
		//主字符串模板,生成nav并添加到html中
		let ul = document.createElement("ul");
		for (let i = 0; i < data.length; i++) {
			let str =
				`<li role="menuitem" tabindex="-1" class="el-submenu">
				<div aria-haspopup="true" class="el-submenu__title" style="padding-left: ${data[i].classNav * 20}px;">
					<i role= "icon">${icon[data[i].icon]()}</i>
					<span>${data[i].navName}</span>
					${that.createFristClassNavArrow(data[i])}
				</div>
				${that.createSecondClassNavUl(data[i])}
			</li>`
			ul.innerHTML += str;
		}
		store.muneList.appendChild(ul);
		store.muneCreated = true;
		console.log("navMenu加载完成")
	}
}
let detailNavList = new DetailNavList();

export default detailNavList
