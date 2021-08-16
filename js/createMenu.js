// 根据data.js中的数据创建menu
//data.js为json格式


import store from "./store.js";
import icon from "./module/tools/units/icon.js";
// console.log("file: createMenu.js ~ line 7 ~ icon", icon)
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
			return `<i class=${iClassName}>${icon.arrow(`${fontSize}`, `${fontSize}`, `${ArrowClassName}`)}</i>`
		}
	},
	creatrNav(data) {
		const that = this;
		//主字符串模板,生成nav并添加到html中
		let ul = document.createElement("ul");
		for (let i = 0; i < data.length; i++) {
			let str =
				`<li role="menuitem" tabindex="-1" class="el-submenu">
				<div aria-haspopup="true" class="el-submenu__title" style="padding-left: ${data[i].classNav * 20}px;">
					<i role= "icon">${icon[data[i].icon]()}</i>
					<span>${data[i].navName}</span>
					${(() => {
					if (data[i].childrens) {
						return that.createArrow(data[i], "arrow fristClass-menu-arrow", "arrow-roll-begining arrow", 20,)
						// return `<i class= "arrow fristClass-menu-arrow">${icon.arrow(20, 20, "arrow-roll-begining arrow")}</i>`
					} else {
						return ""
					}
				})()}
				</div>
				${(() => {
					let child_2 = data[i].childrens;
					if (child_2) {
						return `<ul role="menu" class="el-menu el-menu--inline" style="display: none;">
							${(function () {
								let HTML_2 = "";
								const len = child_2.length;
								for (let item = 0; item < len; item++) {
									// console.log(child_2[item].childrens);
									let child_2_item = child_2[item];
									let _position = false;
									if (child_2_item.childrens) {
										_position = true;
									}
									let str =
										`<li class="el-menu-item-group">
									<div class="el-menu-item-group__title" style="padding-left:${20 + child_2_item.classNav * 5}px;${function () { if (_position) { return "position:relative" } }()}">
										${function () {
											if (child_2_item.icon) {
												return `<i class="arrow">${icon[child_2_item.icon]()}</i>`
											} else {
												return "<!---->"
											}
										}()}
										${(() => {
											if (child_2_item.navName && child_2_item.childrens) {
												return `<span>${child_2_item.navName}</span>
												<i class="arrow secondClass-menu-arrow">${icon.arrow(14, 14, "arrow-roll-begin")}</i>`
											} else {
												return "<!---->"
											}
										})()}
										${(() => {
											if (child_2_item.childrens) {
												return `<i class="arrow secondClass-menu-arrow">${icon.arrow(14, 14, "arrow-roll-begin")}</i>`
											} else {
												return "<!---->"
											}
										})()}
									</div>
									${(() => {
											if (_position) {
												return `<ul role="menu" class="el-menu el-menu--inline" style="display: block;">
											${function () {
														let child_3 = child_2_item.childrens;
														let HTML_3 = "";
														for (let val = 0; val < child_3.length; val++) {
															let str = `<li role="menuitem" tabindex="-1" class="el-menu-item"
														style="padding-left: ${20 + child_3[val].classNav * 5}px;">${child_3[val].navName}</li>`
															HTML_3 += str;
														}
														return HTML_3;
													}()}
										</ul>`
											} else {
												return "<!---->"
											}
										})()}</li>`
									HTML_2 += str;
								}
								return HTML_2
							}())}
							
						</ul>`
					} else {
						return "<!---->"
					}
				})()}
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
