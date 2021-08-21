// code，msg暂无
// navName:标题
// icon:图标
// disabedld:是否禁用
// classNav：第几级的导航栏
// childrens:子导航
// navNameShow:是否显示该级的标题（包含navName,箭头arrow,但不影响他的子导航栏的显示）

const asideData = {
	"code": 200,
	"msg": "",
	"data": {
		"navList": [{
			"navName": "导航一",//导航栏title
			"icon": "setting",
			"disabeld": "false",
			"classNav": 1,
			"childrens": [{//一级子栏
				"navName": "分组一",
				"navNameShow": true,
				"classNav": 2,
				"childrens": [{
					"navName": "选项1",
					"classNav": 3,
				}, {
					"navName": "选项2",
					"classNav": 3,
				}, {
					"navName": "选项3",
					"classNav": 3,
				}]
			}, {
				"navName": "分组二",
				"classNav": 2,
				"childrens": [{
					"navName": "选项1",
					"classNav": 3,
				}]
			}]
		}, {
			"navName": "导航二",//导航栏title
			"icon": "position",
			"disabeld": "false",
			"classNav": 1,
			"childrens": [{//一级子栏
				"navName": "分组一",
				"navNameShow": false,
				"classNav": 2,
				"childrens": [{
					"navName": "选项1",
					"classNav": 3,
				}, {
					"navName": "选项2",
					"classNav": 3,
				}, {
					"navName": "选项3",
					"classNav": 3,
				}]
			}, {
				"navName": "分组二",
				"classNav": 2,
				"childrens": [{
					"navName": "选项1",
					"classNav": 3,
				}, {
					"navName": "选项2",
					"classNav": 3,
				}]
			}, {
				"navName": "分组三",
				"classNav": 2,
			}]
		}, {
			"navName": "导航三",//导航栏title
			"icon": "user",
			"disabeld": "false",
			"classNav": 1,
			"childrens": [{//一级子栏
				"navName": "分组一",
				"navNameShow": false,
				"classNav": 2,
				"childrens": [{
					"navName": "选项1",
					"classNav": 3,
				}, {
					"navName": "选项2",
					"classNav": 3,
				}, {
					"navName": "选项3",
					"classNav": 3,
				}]
			}]
		}, {
			"navName": "导航四",//导航栏title
			"icon": "home",
			"disabeld": "false",
			"classNav": 1
		}, {
			"navName": "导航五",//导航栏title
			"icon": "user",
			"disabeld": "false",
			"classNav": 1,
			"childrens": [{//一级子栏
				"navName": "分组一",
				"navNameShow": false,
				"classNav": 2,
				"childrens": [{
					"navName": "选项1",
					"classNav": 3,
				}, {
					"navName": "选项2",
					"classNav": 3,
				}, {
					"navName": "选项3",
					"classNav": 3,
				}]
			}]
		}]
	},
	"totail": 6
}

export default asideData

