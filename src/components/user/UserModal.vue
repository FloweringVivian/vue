<template>
    <div>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        ref="userModal"
        :before-close="closehandle">
        <span>
            <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="numberValidateForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="numberValidateForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="tel">
                    <el-input v-model="numberValidateForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="用户性质"  prop="region">
                    <el-select v-model="numberValidateForm.region" placeholder="请选择用户性质">
                        <el-option label="普通用户" value="1"></el-option>
                        <el-option label="名誉会员" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="登录验证" prop="delivery">
                    <el-switch on-text="" off-text="" v-model="numberValidateForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="用户权限" class="xz" prop="type">
                    <el-checkbox-group v-model="numberValidateForm.type">
                    <el-checkbox label="美食" name="type"></el-checkbox>
                    <el-checkbox label="健身" name="type"></el-checkbox>
                    <el-checkbox label="秘书" name="type"></el-checkbox>
                    <el-checkbox label="专车" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="numberValidateForm.resource">
                    <el-radio label="品牌商赞助"></el-radio>
                    <el-radio label="场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户备注" prop="desc">
                    <el-input type="textarea" v-model="numberValidateForm.desc"></el-input>
                </el-form-item>
                
            </el-form>
            
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancleClick">取 消</el-button>
            <el-button type="primary" @click="getFormData">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
  import { mapActions ,mapState , mapMutations ,mapGetters} from 'vuex'
  
  export default {
    props:['pageConfig','numberValidateForm'],
    data() {
      return {
        ccc:''
      };
    },
    computed:{
        ...mapState({
            dialogVisible: state => state.a.dialogVisible,
            updateUserData: state => state.a.updateUserData,
            addOrUpdateStatus: state => state.a.addOrUpdateStatus,
        })
    },
    methods: {
        ...mapMutations([
            'DIALOG_HIDE',
            'DIALOG_SHOW',
            'CHANGE_FORM_VALUE'
        ]),
        ...mapActions([
            'ADD_USER'
        ]),
        closehandle(done){
            done();
            this.DIALOG_HIDE();
        },
        cancleClick(){
            this.DIALOG_HIDE();
        },
        async getFormData (){
            this.numberValidateForm.type = this.numberValidateForm.type.join('/');
            let result = await this.ADD_USER({param:this.numberValidateForm,pageConfig:this.pageConfig,status:this.addOrUpdateStatus});
            if(result.code == 0){
                this.$message({
                    showClose: true,
                    message: '恭喜你，成功！',
                    type: 'success'
                });
            }else if(result.code == 1){
                this.$message({
                    showClose: true,
                    message: '错了哦，失败！',
                    type: 'error'
                });
            }
        }
    },
    mounted(){
        
    }
  };
</script>
<style scoped>
    .xz {
        width: 350px;
    }
    .el-checkbox+.el-checkbox {
        margin-left: 0px; 
    }
</style>
