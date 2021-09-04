// code，msg暂无
// navName:标题
// icon:图标
// disabedld:是否禁用
// classNav：第几级的导航栏
// childrens:子导航
// navNameShow:是否显示该级的标题（包含navName,箭头arrow,但不影响他的子导航栏的显示）

const offsetLeft = 20;//默认偏移量
const inc = 10;//偏移量的增量
const attr = {
	classNameOfUl: "el-menu el-menu--inline",
	classNameOfLi: "el-submenu",
	arrowIconClassName: "arrow class-menu-arrow",
	svgClassName: "icon arrow-roll-begining arrow"
}
const attrbute = [{//属性和class设置
	offsetLeft: offsetLeft,
	classNameOfUl: attr.classNameOfUl,
	// role_ul: "menu",
	// role_li: "menuitem",
	tabindex: "-1",
	classNameOfLi: attr.classNameOfLi,
	className_div: "el-submenu__title",
	aria_haspopup: "aria-haspopup",
	arrowIconClassName: attr.arrowIconClassName,
	svgClassName: attr.svgClassName
}, {
	classNameOfUl: attr.classNameOfUl,
	offsetLeft: offsetLeft + inc * 1,
	classNameOfLi: "el-menu-item-group el-submenu",
	className_div: "el-menu-item-group__title",
	arrowIconClassName: attr.arrowIconClassName,
	svgClassName: attr.svgClassName
}, {
	offsetLeft: offsetLeft + inc * 2,
	classNameOfUl: attr.classNameOfUl,
	// role: "el-menu-item",
	tabindex: "-1",
	classNameOfLi: attr.classNameOfLi,
}]

const asideData = {
	code: 200,
	msg: "",
	data: {
		attrbute: attrbute,
		navList: [{
			navName: "导航一",//导航栏title
			icon: "setting",
			disabled: false,
			classNav: 1,
			childrens: [{//一级子栏
				navName: "分组一",
				navNameShow: true,
				classNav: 2,
				childrens: [{
					navName: "选项1",
					classNav: 3,
				}, {
					navName: "选项2",
					classNav: 3,
				}, {
					navName: "选项3",
					classNav: 3,
				}]
			}, {
				navName: "分组二",
				classNav: 2,
				childrens: [{
					navName: "选项1",
					classNav: 3,
				}]
			}]
		}, {
			navName: "导航二",//导航栏title
			icon: "position",
			disabled: false,
			classNav: 1,
			childrens: [{//一级子栏
				navName: "分组一",
				navNameShow: true,
				classNav: 2,
				childrens: [{
					navName: "选项1",
					classNav: 3,
				}, {
					navName: "选项2",
					classNav: 3,
				}, {
					navName: "选项3",
					classNav: 3,
				}]
			}, {
				navName: "分组二",
				classNav: 2,
				childrens: [{
					navName: "选项1",
					classNav: 3,
				}, {
					navName: "选项2",
					classNav: 3,
				}]
			}, {
				navName: "分组三",
				classNav: 2,
				childrens: []
			}]
		}, {
			navName: "导航三",//导航栏title
			icon: "user",
			disabled: false,
			classNav: 1,
			childrens: [{//一级子栏
				navName: "分组一",
				navNameShow: false,
				classNav: 2,
				childrens: [{
					navName: "选项1",
					classNav: 3,
				}, {
					navName: "选项2",
					classNav: 3,
				}, {
					navName: "选项3",
					classNav: 3,
				}]
			}]
		}, {
			navName: "导航四",//导航栏title
			icon: "home",
			disabled: false,
			classNav: 1
		}, {
			navName: "导航五",//导航栏title
			icon: "user",
			disabled: false,
			classNav: 1,
			childrens: [{//一级子栏
				navName: "分组一",
				navNameShow: false,
				classNav: 2,
				childrens: [{
					navName: "选项1",
					classNav: 3,
				}, {
					navName: "选项2",
					classNav: 3,
				}, {
					navName: "选项3",
					classNav: 3,
				}]
			}]
		}]
	},
	totail: 6
}

export default asideData

