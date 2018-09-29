require('./mock/mock')

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/common.scss'
import VueRouter from 'vue-router'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

export const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
	if (to.path == '/login') {
        sessionStorage.removeItem('userObj');
    };
	let userObj = JSON.parse(sessionStorage.getItem('userObj'));
    if (!userObj && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    };
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')