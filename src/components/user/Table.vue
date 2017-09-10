<template>
    <div>
        <el-table
            :data="userData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            fixed
            prop="id"
            label="ID"
            width="55">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="80">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width="220">
            </el-table-column>
            <el-table-column
            prop="tel"
            label="电话"
            width="150">
            </el-table-column>
            <el-table-column
            prop="region"
            label="用户性质"
            width="120"
            :formatter="formatterRegion">
            </el-table-column>
            <el-table-column
            prop="delivery"
            label="登陆验证"
            width="120"
            :formatter="formatterDelivery">
            </el-table-column>
            <el-table-column
            prop="type"
            label="用户权限"
            width="300"
            :formatter="formatterType">
            </el-table-column>
            <el-table-column
            prop="resource"
            label="特殊资源"
            width="200">
            </el-table-column>
            <el-table-column
            prop="desc"
            label="用户备注"
            width="300">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template scope="scope">
                <el-button @click="handleClick" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="updateUserClick(scope)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteUserClick(scope)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-button type="danger" :disabled="bulkDel">批量删除</el-button>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageConfig.currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageConfig.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total" class="pagBtnGroup">
            </el-pagination>
        </div>
        

    </div>
</template>

<script>
  import { mapActions ,mapState , mapMutations ,mapGetters} from 'vuex'
  export default {
    props:['pageConfig'],
    data() {
      return {
        bulkDel:true,
      }
    },
    computed:{
      ...mapState({
          userData : state => state.a.userList,
          total : state => state.a.total*1
      })
    },
    methods: {
      ...mapActions([
          'GET_USER_LIST',
          'DELETE_USER'
          
      ]),
      ...mapMutations([
          'UPDATE_USER_DATA',
          'UPDATE_USER_STATUS'
      ]),
      handleClick() {
        alert('查看')
      },
      updateUserClick(user){
        let data = JSON.parse(JSON.stringify(user.row));
        console.log(data)
        this.UPDATE_USER_DATA(data);
        this.UPDATE_USER_STATUS();
      },
      deleteUserClick(user){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await this.DELETE_USER(user.row.id);
          if(result.code == 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getUserDataFn();
          }else{
            this.$message({
            type: 'info',
            message: '删除失败'
          });  
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleSelectionChange(val){
        this.DeleteArr = val;
        this.bulkDel = this.DeleteArr.length  > 0 ? false : true; 
      },
      handleSizeChange(val) {
        this.pageConfig.pageSize = val;
        this.getUserDataFn();
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.pageConfig.currentPage = val;
        this.getUserDataFn();
      },
      getUserDataFn(){  //请求数据
        this.GET_USER_LIST({pageConfig:this.pageConfig});
      },
      formatterRegion(row, column){ //格式化性质
        let data = row[column.property];//得带当前的数据
        if(data == 1){
          return '普通用户'
        }else if(data == 2){
           return '名誉会员'
        }
      },
      formatterDelivery(row, column){ //格式化登陆验证
          let data = row[column.property];  
          if(data == true){
            return '是'
          }else{
            return '否'
          }
      },
      formatterType(row, column){ //格式化权限
        let data= row[column.property];
        return data;
      }
    },
    mounted(){
      this.getUserDataFn();//请求数据
    }
  }
</script>
<style lang="scss" scoped>
    .pagination{
        margin-top: 20px;
        .pagBtnGroup{
            float:right;
        }
    }
</style>
