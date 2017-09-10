<template>
    <div class="userContent">
        <div>
            <el-button type="primary" @click="addUserClick">新增用户</el-button>
            <div class="userHeader">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="">
                        <el-input v-model="pageConfig.query" placeholder="按用户名查询"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchUser">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div>
            <user-table :pageConfig="pageConfig" ref="userTable"></user-table>
        </div>
        <div style="margin-top:20px;">
            <user-list></user-list>
        </div>
        <div>
            <user-modal ref="modal" :pageConfig="pageConfig" :numberValidateForm="numberValidateForm"></user-modal>
        </div>


    </div>
</template>

<script>
import { mapActions ,mapState , mapMutations ,mapGetters} from 'vuex'
import Table from '../components/user/Table'
import UserList from '../components/user/UserList'
import UserModal from '../components/user/UserModal'
  export default {
    data() {
      return {
        pageConfig:{
          currentPage:1,
          pageSize:5,
          query:''
        },
        numberValidateForm: {
          name: '',
          email:'',
          tel:'',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    computed:{
        ...mapState({
            updateUserData: state => state.a.updateUserData
        })
    },
    watch:{
        updateUserData(val){
            if(val){   
                val.delivery = val.delivery == 1? true :false
                val.type = val.type.split('/')
                this.numberValidateForm = val
                this.DIALOG_SHOW();
            }
        }
    },
    methods: {
        ...mapMutations([
            'DIALOG_SHOW',
            'ADD_USER_STATUS'
        ]),
        addUserClick(){
            this.DIALOG_SHOW();
            this.ADD_USER_STATUS();
            this.$nextTick(() => {//清空表单
                 this.$refs.modal.$refs['numberValidateForm'].resetFields();
            })
        },
        searchUser(){
            //console.log(this.$refs.userTable)
            this.$refs.userTable.getUserDataFn()
        }
    },
    components:{
        'user-table':Table,
        UserList,
        UserModal
    }
  }
</script>
<style lang="scss" scoped>
    .userContent {
        .userHeader {
            float: right;
        }
    }
    

</style>
