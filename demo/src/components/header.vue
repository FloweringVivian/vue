<template>
    <div>
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo">
                <h1>企业管理系统</h1>
            </el-col>
            <el-col :span="14">
                <a class="logout" href="javascript:;" title="退出" @click="logout">
                    <i class="fa fa-power-off"></i>
                </a>
                <span class="agent-name">{{agentName}}</span>
                <img :src="agentLogo" class="agent-logo">
            </el-col>
        </el-col>         
    </div>
</template>



<script>
    import { ajax } from '../api/api.js'
    export default {
        data(){
            return {
                agentName: '',
                agentLogo: '../static/img/devLogo.png'	                          
            }
        },       
        methods: { 
            //获取名称和logo
            getAgentMessage() {
                let userObj = JSON.parse(sessionStorage.getItem('userObj'));
                let timeStamp = new Date().getTime();
                this.agentName = userObj.accountName;
                if (userObj.isHasLogo == true) {
                    this.agentLogo = userObj.logoUrl + '?time=' + timeStamp;
                };
            },
            //退出登录
			logout() {
				var _this = this;
				this.$confirm('确认退出登录吗？', '退出登录', {
					type: 'warning'
				}).then(() => {
                    ajax('/agency/logout.do', {}, 'get').then((response) => {
                        if(response.code == 0){
                            sessionStorage.removeItem('userObj');
					        _this.$router.push('/login');
                        }
                    })					
				}).catch(() => {

				});
			},           
        },       
        mounted(){
            this.getAgentMessage();
        }
    }
</script>

<style lang="scss">   
    .logo h1 {
        font-size: 20px;
        color: #fff;
        padding-left: 20px;
        line-height: 70px;
    }
    .logout,
    .agent-name {
        float: right;
        margin-right: 30px;
        color: #fff;
    }
    .logout .fa {
        font-size: 18px;
    }
    .agent-logo {
        border-radius: 100%;
        float: right;
        margin: 15px 10px 0 0;
    }
</style>

