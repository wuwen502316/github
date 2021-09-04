// 根据data.js中的数据创建menu
//data.js为json格式
// 分析每一级的共同点提取出来，简写代码
//ul>li>div>(i|span|i)>ul>li>div>(i|span|i)
//
//

import store from "./store.js";
import icon from "./module/tools/units/icon.js";
import aisdeData from "./module/tools/units/aisdeData.js";
import asideData from "./module/tools/units/aisdeData.js";
const explanatoryNote = "<!---->";
const attrbute = asideData.data.attrbute;

function isEmpty(obj) {
	// 检验 undefined 和 null
	if (!obj && obj !== 0 && obj !== '') {

		return true;
	}
	if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
		return true;
	}
	if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
		return true;
	}
	return false;
}

function DetailNavList() {
	this.config = null;
	this.navList = null;
	this.data = null;
}
DetailNavList.prototype = {
	init(config) {// 初始化
		this.config = config;
		this.icon = icon;
		for (let k in this.config) {
			if (!this.config.hasOwnProperty(k)) {
				break;
			}
			if (Object.prototype.toString.call(this.config[k]) === "[object Array]") {
				this.data = this.config[k];

			}
		}
		this.creatrNav(this.data);
		this.main_createDom(this.data);
	},
	createArrow: (data, iClassName, ArrowClassName, fontSize) => {//通过字符串模板处理数据，并返回
		if (data.childrens) {
			return `<i class="${iClassName}">${icon.arrow(`${fontSize}`, `${fontSize}`, `${ArrowClassName}`)}</i>`
		} else {
			return explanatoryNote
		}
	},
	initIcon(iconName) {//创建icon图标,并返回
		let htmlclips = null;
		htmlclips = `<i>${this.icon[iconName]()}</i>`;
		return htmlclips;
	},
	createFristClassNavArrow(options) {//第一级nav的箭头;options=data[i]
		const that = this;
		if (options.childrens) {
			return that.createArrow(options, "arrow class-menu-arrow", "arrow-roll-begining arrow", 20,)
		} else {
			return explanatoryNote
		}
	},
	createSecondClassNavUlLiItem(optionsItem, flag) {
		const html1 =
			`<div class="el-menu-item-group__title" style="padding-left:${20 + optionsItem.classNav * 5}px;
				 "position:relative">
				
			${(() => {
				if (optionsItem.navName && optionsItem.childrens) {
					return `<span>${optionsItem.navName}</span>
						<i class="arrow class-menu-arrow">${icon.arrow(14, 14, "arrow-roll-begining")}</i>`
				} else {
					return explanatoryNote
				}
			})()}
			</div>`
		return html1;
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
			return explanatoryNote
		}
	},
	createSecondClassNavUlLi(options) {//第二级nav下的ul>li; options=data[i]
		let HTML_2 = "";
		const len = options.length;
		let html = null;
		for (let item = 0; item < len; item++) {
			let optionsItem = options[item];
			let flag = false;
			if (!isEmpty(optionsItem.childrens)) {//判断是否有子元素
				flag = true;
				html = `<li class="el-menu-item-group">
				${this.createSecondClassNavUlLiItem(optionsItem, flag)}
				${this.createThirdClassNavUl(optionsItem, flag)}</li>`
			} else {
				flag = false;
				html = `<li class="el-menu-item-group">
				${this.createSecondClassNavUlLiItem(optionsItem, flag)}
				${this.createThirdClassNavUl(optionsItem, flag)}</li>`
			}
			HTML_2 += html;
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
			return explanatoryNote
		}
	},
	creatrNav(data) {//主函数,生成aside的dom树
		const that = this;
		//主字符串模板,生成nav并添加到html中
		let ul = document.createElement("ul");
		ul.setAttribute("role", "menu")
		for (let i = 0; i < data.length; i++) {
			let str =
				`<li role="menuitem" tabindex="-1" class="el-submenu">
					<div aria-haspopup="true" class="el-submenu__title" style="padding-left: ${data[i].classNav * data[i].offSetLeft}px;">
						<i role= "icon">${this.icon[data[i].icon]()}</i>
						<span>${data[i].navName}</span>
						${that.createFristClassNavArrow(data[i])}
					</div>
					${that.createSecondClassNavUl(data[i])}
				</li>`
			ul.innerHTML += str;
		}
		store.muneList.appendChild(ul);
		// store.muneCreated = true;
		console.log("navMenu加载完成")
	},
	main_createDom(parms) {//主函数,创建ul主标签
		// let fragment = document.createDocumentFragment("fragment");
		const htmlclips = this.createUl(parms);
		console.log(htmlclips)
	},
	createUl(parms) {
		console.log(this.initAttr("role", "role_ul"))
		if (Object.prototype.toString.call(parms) === "[object Array]") {
			let htmlclips = null;
			htmlclips = `<ul ${this.initAttr("role", "role")} ${this.initClass("parms")}>${this.createLi(parms)}</ul>`
			return htmlclips
		}
	},
	initAttr(attr, options) {
		if (attrbute.options) {
			return `${attr}=${attrbute.options}`
		} else {
			return attrbute[0].options;
		}
	},
	initClass(className) {
		if (className || className == "") {
			return ""
		} else {
			return `class=${className}`
		}
	},
	createLi(parms) {
		let htmlclips = "";
		for (let item = 0; item < 1; item++) {
			htmlclips += `
			<li ${this.initClass(`${parms[item].disabled ? 'is-disabled' : ''}`)}>
				<div>
					<i>${parms[item].icon}</i>
					<span>${parms[item].navName}</span>
					${this.createArrow(parms[item], "arrow", "arrow-roll-begining arrow", 20)}
				</div>
				${this.hasChildrens(parms[item])}
			</li>
			`
		}
		return htmlclips
	},
	hasChildrens(parms) {
		if (parms.childrens || parms.childrens === []) {
			const res = this.createUl(parms.childrens);
			return res
		} else {
			return explanatoryNote
		}
	},
	fristClassNav(ul, parms) {//第一级nav,li --> i(icon)|span(nav.name)|i(arrow)
		for (let i = 0; i < parms.length; i++) {
			let str =
				`< li role = "menuitem" tabindex = "-1" class="el-submenu" >
	<div aria-haspopup="true" class="el-submenu__title" style="padding-left: ${parms[i].classNav * parms[i].offSetLeft}px;">
		<i role="icon">${icon[parms[i].icon]()}</i>
		<span>${parms[i].navName}</span>
		${this.createFristClassNavArrow(parms[i])}
	</div>
${this.SecondClassNav(parms[i])}
			</ > `
			ul.innerHTML += str;
		}
	},
	SecondClassNav(parms) {//
		console.log("file: createMenu.js ~ line 152 ~ SecondClassNav ~ parms", parms)
		let html = "";
		let htmlclips = "";
		if (parms.childrens || parms.childrens === []) {
			htmlclips = `
	< ul role = "menu" class="el-menu el-menu--inline" style = "display: none;"ids=1 >
		${this.initIcon(parms.icon)}
			</ >
	`
		} else {
			return explanatoryNote
		}
		return htmlclips
	}
}

let detailNavList = new DetailNavList();
export default detailNavList
