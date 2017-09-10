<template>
    <div class="main">
        <div class="login">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="region">
                    <el-input type="password" v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="info" @click="submitForm('formLabelAlign')">登陆</el-button>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                labelPosition:'right',
                formLabelAlign: {
                    name: '',
                    region: ''
                },
                rules:{
                    name: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {    //填写正确时执行
                    let user = {
                        auth:true
                    };
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.$router.push({ path: '/home/user' });
                } else {        //填写错误时执行
                    //this.$message.error('错了哦，这是一条错误消息');
                    return false;
                }
                });
            }
        }
    }
</script>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }
    html,body {
        width: 100%;
        height: 100%;
        background-color: #f9f6f6;
    }
    .main {
        .login {
            width: 400px;
            height: 200px;
            position: absolute;
            top: 30%;
            left: 50%;
            margin-left: -200px;
            margin-top: -100px;
            background-color: #f9f6f6;
            button{
                width: 320px;
            }
        }
    }
    
</style>
