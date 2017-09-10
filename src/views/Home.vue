<template>
  <div id="pp">
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
            <li class="logo">VUE-CLI</li>
            <el-menu-item :class="[$route.active == item.path? is-active:'']" @click="routeHandleClick(item.path)" v-if="item.name" v-for="(item,index) in routeList" :index="item.path" :key="index" track-by="$index">{{item.name}}</el-menu-item>
      </el-menu>
    </div>
    <div class="wp">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        routeList:[]
      };
    },
    methods: {
      routeHandleClick(path){
        this.$router.push(path);
      }
    },
    mounted(){
      let obj= this.$router.options.routes.filter(function(val) {
          return val.children;
      });
      this.routeList = obj[0].children;
      
    }
  }
</script>


<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#pp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  padding: 0px;
  .logo {
    float: left;
    line-height: 60px;
    font-size: 30px;
    color: red;
    margin-right: 40px;
    margin-left: 20px;
  }
  .wp{
    width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity 1.5s 
  }

}
</style>
