<template>
    <div>
        <el-card class="box-card">
            <div v-for="list in userList" :key="list.id" class="text item">
                {{'用户名称 ' + list.name }}&nbsp&nbsp&nbsp&nbsp{{list.region == 2? '名誉会员':'普通用户' }}&nbsp&nbsp&nbsp&nbsp{{list.tel}}
            </div>
        </el-card>
    </div>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState({
          userList: state => state.a.userList
      })
    }
  }
</script>




<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>