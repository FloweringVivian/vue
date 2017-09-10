import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Shipped from '../views/Shipped.vue'
import Inventory from '../views/Inventory.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:'/home/user' },
    {path: '/login',component: resolve => require(['../views/Login.vue'], resolve)},
    {path: '/home',component: resolve => require(['../views/Home.vue'], resolve) ,children:[
      {path: '/',redirect:'/home/user'},
      {path: '/home/user',name: '用户',component: resolve => require(['../views/User.vue'], resolve) },
      {path: '/home/shipped',name: '已发布商品',component: resolve => require(['../views/Shipped.vue'], resolve) },
      {path: '/home/inventory',name: '为上架商品',component: resolve => require(['../views/Inventory.vue'], resolve) },
    ]},
    
  ]
})
