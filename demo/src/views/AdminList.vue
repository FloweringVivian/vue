<template>
	<div>
		<div class="content-right">
			<div class="search-header">
				<el-row class="toolbar">
					<el-form :inline="true" class="el-form-pay" label-width="130px">
						<el-col :span="6">
							<el-form-item label="管理员名称">
								<el-input size="medium" v-model="searchObj.developerName" maxlength="64"></el-input>
							</el-form-item>	
						</el-col>	
						<el-col :span="6">
							<el-form-item label="手机号">
								<el-input size="medium" v-model="searchObj.mobile" maxlength="64"></el-input>
							</el-form-item>	
						</el-col>
						<el-col :span="12">
							<el-form-item label="添加时间">
								<el-col :span="11">
									<el-date-picker v-model="searchObj.registerTimeStart" type="datetime"></el-date-picker>
								</el-col>
								<el-col class="date-picker-line" :span="2">—</el-col>
								<el-col :span="11">
									<el-date-picker v-model="searchObj.registerTimeEnd" type="datetime"></el-date-picker>
								</el-col>							
							</el-form-item>	
						</el-col>				
					</el-form>
				</el-row>
				<el-row class="toolbar">
					<el-form :inline="true" class="el-form-pay" label-width="130px">
						<el-col :span="6">
							<el-form-item label="管理员ID">
								<el-input size="medium" v-model="searchObj.developerId" maxlength="64"></el-input>
							</el-form-item>		
						</el-col>	
						<el-col :span="6">
							<el-form-item label="邮箱">
								<el-input size="medium" v-model="searchObj.email" maxlength="64"></el-input>
							</el-form-item>	
						</el-col>
						<el-col :span="6">
							<el-form-item label="所属部门">
								<el-select size="medium" v-model="searchObj.department" maxlength="64">
									<el-option label="全部" value=""></el-option>
									<el-option label="人力资源部" value="1"></el-option>
									<el-option label="技术部" value="2"></el-option>
									<el-option label="客服部" value="3"></el-option>
									<el-option label="市场部" value="4"></el-option>
									<el-option label="产品部" value="5"></el-option>
								</el-select>
							</el-form-item>
						</el-col>	
						<el-col :span="6">
							<el-form-item label="">
								<el-button size="medium" type="primary" @click="emptySearchObj">清空</el-button>	
								<el-button size="medium" type="primary" @click="searchDeveloperList">搜索</el-button>	
							</el-form-item>
						</el-col>		
					</el-form>
				</el-row>				
			</div>	
			<div class="btn-header">
				<el-button size="medium" type="primary" @click="newAdminFn()">新建</el-button>
			</div>
			<div class="table-list">
				<el-table :data="developerListData" stripe border>
					<el-table-column prop="developerId" label="管理员ID" min-width="10%"></el-table-column>
					<el-table-column prop="developerName" label="管理员名称" min-width="10%"></el-table-column>					
					<el-table-column prop="email" label="邮箱" min-width="17%"></el-table-column>
					<el-table-column prop="mobile" label="手机号" min-width="15%"></el-table-column>
					<el-table-column prop="department" :formatter="departmentFormatter" label="所属部门" min-width="15%"></el-table-column>
					<el-table-column prop="registerTime" label="添加时间" min-width="15%"></el-table-column>
					<el-table-column label="操作" min-width="18%">
						<template slot-scope="scope">
					        <el-button type="primary" @click="editAdmin(scope.row)" size="mini" plain>编辑</el-button>
					        <el-button type="primary" @click="delAdmin(scope.row)" size="mini" plain>删除</el-button>
					        <el-button type="primary" @click="viewAdmin(scope.row)" size="mini" plain>查看</el-button>
				        </template>
					</el-table-column>					
				</el-table>
			</div>
			<div class="table-pager">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10,20,30]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
			</div>
		</div>
		<div class="all-dialog">
			<!-- 新建 or 修改 start -->
			<el-dialog :title="adminTitle" :visible.sync="adminFormVisible">
			    <el-form :model="adminForm" :rules="adminRule" ref="adminForm">
				    <el-form-item label="管理员名称" label-width="120px" prop="developerName">
				        <el-input v-model="adminForm.developerName" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="邮箱" label-width="120px" prop="email">
				        <el-input v-model="adminForm.email" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="手机号" label-width="120px" prop="mobile">
				        <el-input v-model="adminForm.mobile" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="所属部门" label-width="120px" prop="department">
				        <el-select v-model="adminForm.department" maxlength="64">
							<el-option label="全部" value=""></el-option>
							<el-option label="人力资源部" value="1"></el-option>
							<el-option label="技术部" value="2"></el-option>
							<el-option label="客服部" value="3"></el-option>
							<el-option label="市场部" value="4"></el-option>
							<el-option label="产品部" value="5"></el-option>
						</el-select>
				    </el-form-item>
				    <el-form-item label="备注" label-width="120px">
				        <el-input type="textarea" v-model="adminForm.remark" auto-complete="off"></el-input>
				    </el-form-item>
			    </el-form>
			    <div slot="footer" class="dialog-footer">
			        <el-button @click="adminFormVisible = false">取 消</el-button>
			        <el-button type="primary" @click="adminFormSubmit">确 定</el-button>
			    </div>
			</el-dialog>
			<!-- 新建 or 修改 end -->

			<!-- 查看 start -->
			<el-dialog title="查看管理员信息" :visible.sync="adminFormViewVisible">
			    <el-form :model="adminFormView">
				    <el-form-item label="管理员名称：" label-width="120px">
				    	<span>{{ adminFormView.developerName }}</span>
				    </el-form-item>
				    <el-form-item label="邮箱：" label-width="120px">
				    	<span>{{ adminFormView.email }}</span>
				    </el-form-item>
				    <el-form-item label="手机号：" label-width="120px">
				    	<span>{{ adminFormView.mobile }}</span>
				    </el-form-item>
				    <el-form-item label="所属部门：" label-width="120px">
				    	<span>{{ adminFormView.department | departmentFilter }}</span>
				    </el-form-item>
				    <el-form-item label="备注：" label-width="120px">
				    	<span>{{ adminFormView.remark }}</span>
				    </el-form-item>
			    </el-form>
			    <div slot="footer" class="dialog-footer">
			        <el-button type="primary" @click="adminFormViewVisible = false">关 闭</el-button>
			    </div>
			</el-dialog>
			<!-- 查看 end -->
		</div>
	</div>
</template>

<script>
	import { ajax } from '../api/api.js'

	export default {
		data() {
			return {
				developerListData: [],  //开发者列表数组
				currentPage: 1,  //当前页
				pageSize: 10,  //每页条数
				total: 0,  //数据总数
				searchObj: {  //搜索条件
					developerName: '',  
					mobile: '',  
					registerTimeStart: '',
					registerTimeEnd: '',
					developerId: '',
					email: '',
					department: ''
				},
				adminType: 1,  //1代表新建，2代表修改
				adminTitle: '新建管理员',
				adminFormVisible: false,  //新建/修改弹窗默认状态：关闭
				adminForm: {},  //新建/修改form对象	
				adminFormView: {},  //查看form对象
				adminFormViewVisible: false,  //查看弹窗默认状态：关闭

				//规则校验
				adminRule: {
		            developerName: [
		            	{ required: true, message: '请输入管理员名称', trigger: 'blur' },	
		            	{ min: 2, max: 20, message: '管理员名称长度在 2 到 20 个字符', trigger: 'blur' }	            
		            ],
		            email: [
		            	{ required: true, message: '请输入邮箱', trigger: 'blur' },		            
		            ],
		            mobile: [
		            	{ required: true, message: '请输入手机号', trigger: 'blur' },		            
		            ],
		            department: [
		            	{ required: true, message: '请选择所属部门', trigger: 'change' },		            
		            ],
		        }			
			}
		},
		filters: {
			//所属部门
			departmentFilter: function(val) {
				switch(val) {
					case '1':
						return '人力资源部';
						break;
					case '2':
						return '技术部';
						break;
					case '3':
						return '客服部';
						break;
					case '4':
						return '市场部';
						break;
					case '5':
						return '产品部';
						break;
				};
			}
		},
		methods: {
			//获取管理员列表
			getDeveloperList() {			
				let url = '/admin/list.do';
				let param = this.searchObj;
				param.pageNum = this.currentPage;
				param.pageSize = this.pageSize;

				ajax(url, param).then(response => {
					if (response.code == 0) {
						this.developerListData = response.data;
						this.total = response.total;
					} else {
						this.$message({
							message: response.desc,
							type: 'warning'
						});
					};				
				});
			},
			//格式化所属部门
			departmentFormatter(row, index) {
				switch(row.department) {
					case '1':
						return '人力资源部';
						break;
					case '2':
						return '技术部';
						break;
					case '3':
						return '客服部';
						break;
					case '4':
						return '市场部';
						break;
					case '5':
						return '产品部';
						break;
				};
			},
			//搜索
			searchDeveloperList() {
				this.currentPage = 1;
				this.getDeveloperList();
			},
			//清空
			emptySearchObj() {
				this.searchObj = {};
			},
			//切换每页显示条数
			handleSizeChange(val) {
				this.pageSize = val;
				this.getDeveloperList();
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getDeveloperList();
			},
			//新建
			newAdminFn() {
				this.adminFormVisible = true;
				this.adminForm = {};
				this.adminTitle = '新建管理员';
				this.adminType = 1;
			},
			//编辑
			editAdmin(row) {
				this.adminFormVisible = true;
				this.adminForm = row;
				this.adminTitle = '修改管理员';
				this.adminType = 2;
			},
			//新建/编辑提交
			adminFormSubmit() {
				this.$refs.adminForm.validate((valid) => {
		            if (valid) {		            	
		            	let url = '';
						let param = this.adminForm;

						if (this.adminType == 1) {
							url = '/addAdmin.do';
						} else {
							url = '/editAdmin.do';
						};
						console.log(this.adminType)
			            ajax(url, param).then(response => {
			                if(response.code == 0){	
			                	this.adminFormVisible = false;
			                	this.$message({
									message: response.desc,
									type: 'success'
								});
			                }else{
			                    this.$message({
									message: response.desc,
									type: 'warning'
								});
			                }
			            })
		            } else {			          
			            return false;
		            }
		        });
			},
			//删除
			delAdmin(row) {
				this.$confirm('确认删除该管理员吗？', '删除管理员', {
					type: 'warning'
				}).then(() => {
                    ajax('/delAdmin.do', {}, 'get').then((response) => {
                        if(response.code == 0){
                            this.$message({
								message: response.desc,
								type: 'success'
							});
							this.getDeveloperList();  //刷新列表
                        };
                    })					
				}).catch(() => {

				});
			},
			//查看
			viewAdmin(row) {
				this.adminFormViewVisible = true;
				this.adminFormView = row;
			},
		},
		mounted() {
			this.getDeveloperList();
		},
	}
</script>

<style scoped lang="scss">	
	.el-form-pay .el-form-item {
		margin-right: 50px;
		&:last-child {
			margin-right: 0;
		}
	}
	.date-picker-line {
		padding-left: 15px;
	}
	.search-header .el-form-item {
		margin-bottom: 15px;
	}
</style>