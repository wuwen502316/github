// let flag = true;



window.onload = function () {
	const tools = window.tools; //全局变量引入
	window.is_show_close = true;
	const app = document.querySelector("#app");
	// console.log(tools);
	const handleCancel = document.querySelectorAll(".handle-cancel"); //关闭按钮
	const dropdownTrigger = document.querySelector(".el-header-item.right.dropdown-trigger");//clothes DIV
	const elBtnChange = document.querySelector(".el-btn-change"); //change innerHTML内容
	const elBtnChangeSpan = document.querySelector(".el-btn-change>span"); //change innerHTML内容
	const showCloseDiv = document.querySelector(".is-showClose");
	const aside = document.querySelector(".aside.el-aside");
	const showCloseSpan = document.querySelector(".is-showClose>span");
	const dropdown = document.querySelector("ul[role='dropdown--menu']"); //dropdown(下拉菜单)的ul的li
	const dropdowns = dropdown.querySelectorAll("li[role='dropdown--menuitem']"); //dropdown(下拉菜单)的ul的li
	// const dropdownMenuitems = document.querySelectorAll(".dropdown--menuitem"); //dropdown下拉菜单的div
	const animationsCallBackFunction = {
		out: (dom) => {
			dom.classList.add("aside-menu-fade-out");
			dom.style = ""
			dom.addEventListener("animationend", function () { //监听动画是否完成
				dom.classList.remove("aside-menu-fade-out");
				dom.style = ""
				dom.removeEventListener("animationend", this);
			}, false)
		},
		in: (dom, argus) => {
			dom.classList.add('aside-menu-fade-in');
			dom.addEventListener("animationend", function () {//监听动画是否完成
				dom.style.display = !argus ? "block" : "none";
				dom.classList.remove("aside-menu-fade-in");
				dom.removeEventListener("animationend", this);
			}, false)
		},
		_out(dom) {
			return (dom) => {
				this.out(dom)
			}
		},
		_in(dom, argus) {
			return (dom, argus) => {
				this.in(dom, argus)
			}
		}
	}
	const animations = {//添加动画函数
		menuItemFadeOut(dom, options, argus) {
			tools.handleAnimation({
				animationName: "menu-item-fade-out",
				rule: `to{height:${options};opacity:1;}`,
				ruleName: "to"
			}).addAnimation(animationsCallBackFunction.out(dom, argus))
		},
		menuItemFadeIn(dom, options, argus) {
			tools.handleAnimation({
				rule: `0%{height:${options};opacity:1;}`,
				animationName: "menu-item-fade-in",
				ruleName: "from"
			}).addAnimation(animationsCallBackFunction.in(dom, argus))
		},
		repalce(dom, options, cb, argus) {
			tools.handleAnimation({
				rule: options.rule,
				animationName: options.animationName,
				ruleName: options.ruleName
			}).replaceAnimation(cb(dom, argus))
		}
	}
	const eventOperations = { //事件
		dropdownTriggerClick(e) { //dropdown下拉菜单点击事件
			// let e = e ? e : window.event;
			let extend = dropdown.getAttribute("is-extend");
			if (!JSON.parse(extend)) {
				tools.handleClass.replaceClass(dropdown, "hidden", "show");
			} else {
				tools.handleClass.replaceClass(dropdown, "show", "hidden");
			}
			dropdown.setAttribute("is-extend", !JSON.parse(extend));
			e.stopPropagation();
		},
		elBtnChangeClick() { //改变内的nitify or message
			const inner = elBtnChangeSpan.innerHTML;
			elBtnChangeSpan.innerHTML = inner && inner === "message" ? "notify" : "message";
		},
		isShowCloseBtn() { //控制关闭按钮
			const inner = showCloseSpan.innerHTML;
			showCloseSpan.innerHTML = inner && inner === "可关闭" ? "不可关闭" : "可关闭";
			window.is_show_close = !window.is_show_close;
		},
		closeDropDownMenu() {
			let extend = dropdown.getAttribute("is-extend");
			if (JSON.parse(extend)) {
				window.tools.handleClass.replaceClass(dropdown, "show", "hidden");
				dropdown.setAttribute("is-extend", !JSON.parse(extend));
			}
			return;
		},
		changeAsideColor(replaceName, _className) {//改变aside的背景色
			tools.handleClass.replaceClass(aside, replaceName, _className);
		}
	}
	// dark:#001529;light:#fff
	dropdowns[0].addEventListener("click", (e) => {//frist-li
		// const flag = e.currentTarget.children[0].innerHTML.includes("亮") ? true : false;
		// if (flag) {
		eventOperations.changeAsideColor("dark", "light");
		// }
	})
	dropdowns[1].addEventListener("click", (e) => {//second-li
		// const flag = e.currentTarget.children[0].innerHTML.includes("暗") ? true : false;
		// if (flag) {
		eventOperations.changeAsideColor("light", "dark");
		// }
	})
	for (let i = 0; i < dropdowns.length; i++) {//为下拉菜单添加click事件
		dropdowns[i].addEventListener("click", (e) => {
			e.stopPropagation();//点击ul时阻止冒泡
			let eTarget = null;
			eTarget = e.currentTarget;//获取绑定事件的元素
			if (!eTarget.className.includes("dropdown--menuitem-selected")) {
				for (let i = 0; i < dropdowns.length; i++) {
					if (dropdowns[i].className.includes("dropdown--menuitem-selected")) {
						dropdowns[i].classList.remove("dropdown--menuitem-selected");
					}
				}
				eTarget.classList.add("dropdown--menuitem-selected")
			}
			setTimeout(eventOperations.closeDropDownMenu, 100);
		})
	}
	document.addEventListener('click', function () { //当ul:display:block时，点击其他地方隐藏ul
		eventOperations.closeDropDownMenu();
	}, false);

	dropdownTrigger.onclick = (e) => { //dropdown下拉菜单点击事件
		eventOperations.dropdownTriggerClick(e);
	}
	elBtnChange.onclick = () => { //改变内的nitify or message
		eventOperations.elBtnChangeClick();
	}
	showCloseDiv.onclick = () => { //控制关闭按钮
		eventOperations.isShowCloseBtn();
	}

	(function btnClick() { //btn点击时的事件
		let btns = document.querySelectorAll(".btns-conllection >.el-button");
		for (let i = 0; i < btns.length; i++) {
			// 如果btn的className不包含is-disabled并且验证btn是否满足role=btn属性
			if (btns[i].className.indexOf("is-disabled") <= -1 && btns[i].getAttribute("role") === "btn") {
				btns[i].onclick = e => { //绑定事件
					let type = null;
					let message = null;
					const methods = elBtnChangeSpan.innerHTML;
					let el = e.currentTarget; //只能获取绑定对应元素的target
					type = el.getAttribute("rtype");
					message = el.children[0].innerHTML;

					if (methods == "message") {
						this.tools.$message({
							type: type,
							message: message,
							is_show_close: window.is_show_close,
							duration: 3000
						})
					} else if (methods == "notify") {
						this.tools.$notify({
							type: type,
							title: "title",
							message: message,
							is_show_close: window.is_show_close
						})
					} else {
						return;
					}
				}
			}
		}
	}(window));
	for (let i = 0; i < handleCancel.length; i++) {
		handleCancel[i].onclick = () => {
			let el_message_box_wapper = document.querySelectorAll(".el-message-box__wrapper");
			if (el_message_box_wapper && el_message_box_wapper.length <= 1) {
				document.querySelector("body").removeChild(el_message_box_wapper[0]);
			}
			this.tools.$message({
				message: "已取消",
				type: "error",
				duration: 3000
			})
		}
	}
	let Aside = function (options) {
		for (const key in options) {
			if (Object.hasOwnProperty.call(options, key)) {
				this.key = options[key]
			}
		}
		this.ischangedOut = false;
		this.ischangedIn = false;
		this.arrowchangeFunction = {
			out(el) {
				let svg = el.querySelector("div .arrow-roll-begining"); //svg2D变换
				tools.handleClass.replaceClass(svg, "arrow-roll-begining", "arrow-roll-clicked");
				tools.handleClass.addClass(el, "is-opened el-submenu-transform"); //li添加className
			},
			in(el) {
				let svg = el.querySelector("div .arrow-roll-clicked");
				tools.handleClass.replaceClass(svg, "arrow-roll-clicked", "arrow-roll-begining");
				tools.handleClass.removeClass(el, "is-opened el-submenu-transform arrow-roll-clicked");
			}
		}
		this.elSubmenu = document.querySelectorAll('.el-submenu');
		this.arr = [];
		this.submenuTitle = document.querySelectorAll(".el-submenu__title");
		this.init();
	}
	Aside.prototype = {
		init() {
			this.getAsidePerItemHeight();
			this.bindClickEvent();
		},
		getAsidePerItemHeight() {
			for (let index = 0; index < this.elSubmenu.length; index++) {
				const element = this.elSubmenu[index].querySelector('.el-menu.el-menu--inline');
				if (element) {
					element.style.display = "block";
					this.arr[index] = (window.getComputedStyle(element).height);
					element.style.display = "none";
				} else {
					this.arr[index] = ("0px")
				}
			}
			console.log(this.arr)
		},
		bindClickEvent() {
			for (let i = 0; i < this.submenuTitle.length; i++) {
				this.submenuTitle[i].onclick = (e) => {
					e.stopPropagation();
					let el = e.currentTarget.parentNode; //li 获取绑定click事件的dom节点(不同于e.target)
					// console.log(el.querySelectorAll(".arrow.class-menu-arrow"));
					// if (!el.getElementsByTagName("UL").length) {
					// 	return
					// }
					let flag = el.querySelector(".el-submenu__title").getAttribute("aria-expanded");
					let menu_inline = el.querySelector(".el-menu.el-menu--inline");//li>div>ul
					//当前节点下获取目标节点的属性
					if (!flag && !this.ischangedOut) {
						//判断li的className是否符合要求,并且li>div没有"aria-expanded"属性
						el.querySelector(".el-submenu__title").setAttribute("aria-expanded", true);
						// li设置"aria-expanded"属性即li是展开状态
						if (menu_inline) {
							animations.menuItemFadeOut(menu_inline, this.arr[i], flag);//调取animations有关的函数
							this.ischangedOut = true;
						}
					} else if (flag && !this.ischangedIn) {
						el.querySelector(".el-submenu__title").removeAttribute("aria-expanded");
						//li折叠时移除"aria-expanded"属性即表示不是展开状态
						this.arrowchangeFunction.in(el);
						if (menu_inline) {
							animations.menuItemFadeIn(menu_inline, this.arr[i], flag);
							this.ischangedIn = true;
						}
					} else if (!flag && this.ischangedOut) {
						el.querySelector(".el-submenu__title").setAttribute("aria-expanded", true);
						animations.repalce(menu_inline, {
							rule: `100%{height:${this.arr[i]};opacity:1`,
							// rule: `100%{height:${this.arr[i]}`,
							ruleName: "100%",
							animationName: "menu-item-fade-out"
						}, animationsCallBackFunction._out(menu_inline), flag)
						this.arrowchangeFunction.out(el);
					} else if (flag && this.ischangedIn) {
						el.querySelector(".el-submenu__title").removeAttribute("aria-expanded");
						animations.repalce(menu_inline, {
							rule: `0%{height:${this.arr[i]};opacity:1`,
							// rule: `0%{height:${this.arr[i]}`,
							ruleName: "0%",
							animationName: "menu-item-fade-in"
						}, animationsCallBackFunction._in(menu_inline), flag)
						this.arrowchangeFunction.in(el);
					}
				}
			}
		}
	}
	let asideFun = new Aside();

	let observerDomTree = (app) => {//监听dom树的变化
		this.config = {
			// attributes: true,//属性
			childList: true,//子元素
			subtree: true
		}
		this.callBack = (mutationsList, observer) => {
			asideFun.getAsidePerItemHeight()
			console.log(mutationsList, "line-293")
		}
		const observer = new MutationObserver(this.callBack);
		observer.observe(app, this.config)
	}
	observerDomTree(app)
}
