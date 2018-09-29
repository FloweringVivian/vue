<template>
<div class="login-body">
	<div class="login">
		<h1>企 业 管 理 系 统</h1>
		<el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left" label-width="0">          
			<el-form-item prop="userName">
                <el-input type="text" v-model="loginForm.userName" placeholder="邮箱/手机号/用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-button" type="primary" @click="loginSubmit">登 录</el-button>
            </el-form-item>                      
        </el-form>
	</div>
</div>
</template>

<script>
	import { ajax } from '../api/api.js'

	export default {
		data() {
			return {
				loginForm: {
					userName: '',
					password: ''
				},
				loginRule: {
		            userName: [
		            	{ required: true, message: 'Please input a user name', trigger: 'blur' },		            
		            ],
		            password: [
		            	{ required: true, message: 'Please input a password', trigger: 'blur' },		        
		            ]
		        }
			}
		},
		methods: {
			//登录
			loginSubmit() {		      
		        this.$refs.loginForm.validate((valid) => {
		            if (valid) {
		            	let url = '/agency/login.do';
						let param = {
							userName: this.loginForm.userName,
							password: this.loginForm.password
						};

			            ajax(url, param).then(response => {
			                if(response.code == 0){		
			                	let userObj = {
			                		isHasLogo: response.data.isHasLogo,
			                		accountName: response.data.accountName,
			                		logoUrl: response.data.logoUrl
			                	};	                    
			                    sessionStorage.setItem('userObj', JSON.stringify(userObj));

			                    this.$router.push({ path: '/adminList' });
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
		},
		mounted() {

		}
	}
</script>
<style lang="scss">	
	.login {
		width: 300px;
		margin: 84px auto 0;
		border-radius: 5px;
		padding: 40px;
		h1 {
			font-size: 28px;
			text-align: center;
			padding: 34px 0 80px 0;
			color: #0054a6;
		}
		.login-button {
			width: 100%;
		}
		.el-form-item {
			margin-bottom: 30px;
		}
		.el-input__inner {
			height: 48px;
			line-height: 48px;
		}
		.el-button {
		    padding: 16px 20px;
		}
	}
</style>
