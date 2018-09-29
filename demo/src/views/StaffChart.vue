<template>
	<div>
		员工统计
	</div>
</template>

<script>
	import { ajax } from '../api/api.js'

	export default {
		data() {
			return {
				userLockListData: [],  //用户列表数组
				currentPage: 1,  //当前页
				pageSize: 10,  //每页条数
				total: 0,  //数据总数
				searchObj: {
					developerName: '',  
					lockStatus: '',  
					developerId: '',
					sn: '',
					activeTimeStart: '',
					activeTimeEnd: '',
					shellNumber: '',
					uploadTimeStart: '',
					uploadTimeEnd: ''
				},
				el5Status: {  //库存情况
					inActiveLockNumber: 0,  //未激活
					activeLockNumber: 0,  //激活成功
					activeFailedNumber: 0  //激活失败
				}			
			}
		},
		methods: {
			//获取控制锁库存
			getMasterLockStock() {
				let url = '/agency/lock/stock.do';
				let param = {
					lockType: 2
				};
				ajax(url, param).then(response => {
					if (response.code == 0) {
						this.el5Status.inActiveLockNumber = response.data.inActiveLockNumber;
						this.el5Status.activeLockNumber = response.data.activeLockNumber;
						this.el5Status.activeFailedNumber = response.data.activeFailedNumber;
					} else {
						this.$message({
							message: response.desc,
							type: 'warning'
						});
					};					
				});
			},
			//获取用户锁列表
			getUserLockList() {			
				let url = '/agency/lock/list.do';
				let param = this.searchObj;
				param.pageNum = this.currentPage;
				param.pageSize = this.pageSize;
				param.type = 2;
			
				ajax(url, param).then(response => {
					if (response.code == 0) {
						this.masterLockListData = response.data;
						this.total = response.total;
					} else {
						this.$message({
							message: response.desc,
							type: 'warning'
						});
					};				
				});
			},
			//搜索
			searchUserLockList() {
				this.currentPage = 1;
				this.getUserLockList();
			},
			//切换每页显示条数
			handleSizeChange(val) {
				this.pageSize = val;
				this.getUserLockList();
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getUserLockList();
			},
			//格式化开发者锁状态
			lockStatusFormatter(row, index) {				
				switch(row.lockStatus) {
					case '1':
						return 'Inactivated';
						break;
					case '2':
						return 'Activated';
						break;
					case '3':
						return 'Activated Failure';
						break;
				};
			}
		},
		mounted() {
			this.getMasterLockStock();
			this.getUserLockList();
		},
	}
</script>

<style scoped lang="scss">
	$common-color: #409EFF;

	.el-form-pay .el-form-item {
		margin-right: 50px;
		&:last-child {
			margin-right: 0;
		}
	}
	.date-picker-line {
		padding-left: 15px;
	}
	.el-form-item {
		margin-bottom: 15px;
	}
	.el5-status {
		padding-bottom: 20px;
		font-size: 18px;
		.num {
			color: $common-color;
			font-size: 20px;
		}
	}
</style>