<template>
  <div id="app">
    <div>
      <router-view></router-view>
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
        console.log(path)
        this.$router.push(path);
      }
    },
    mounted(){
      this.routeList = this.$router.options.routes;
    }
  }
</script>


<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app {
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
}
</style>
