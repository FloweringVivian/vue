import qs from 'qs'
const Mock = require('mockjs');

let Random = Mock.Random;

let dataObj = Mock.mock({
	//管理员列表
	"adminList|10": [{
		"developerName":()=>Random.name(),
	    "developerId|+1": 1,
	    "discountAmount":"abc",
	    "mobile":/^1[385][1-9]\d{8}/,
	    "email":()=>Random.email(),
	    "department|1":["1","2","3","4","5"],
	    "registerTime":()=>Random.datetime(),
	    "remark":"备注"
	}],
})

//登录
Mock.mock('/api/agency/login.do', (req, res) => {
	return {
		"code":0,
	    "desc":"common.ok",
	    "data":{
		    "isHasLogo":false,
		    "accountName":"peter",
		    "logoUrl":""
	    }
	}
});

//退出登录
Mock.mock('/api/agency/logout.do', (req, res) => {
	return {
		"code":0,
	    "desc":"common.ok"
	}
});

//管理员列表
Mock.mock('/api/admin/list.do', (req, res) => {
	return {
		"code":0,
	    "desc":"success",
	    "pageNum":1,
	    "pageSize":10,
	    "totalPage":3,
	    "total":30,
	    "data":dataObj.adminList
	}
});

//新建管理员
Mock.mock('/api/addAdmin.do', (req, res) => {
	return {
		"code":0,
	    "desc":"新建成功"
	}
});

//修改管理员
Mock.mock('/api/editAdmin.do', (req, res) => {
	return {
		"code":0,
	    "desc":"修改成功"
	}
});

//删除管理员
Mock.mock('/api/delAdmin.do', (req, res) => {
	return {
		"code":0,
	    "desc":"删除成功"
	}
});

