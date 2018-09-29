import Home from './views/Home.vue'
import Login from './views/Login.vue'
import AdminList from './views/AdminList.vue'
import StaffList from './views/StaffList.vue'
import StaffChart from './views/StaffChart.vue'
import MyCenter from './views/MyCenter.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/',
        redirect: '/adminList',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart', //图标样式class
        children: [
            { path: '/adminList', component: AdminList, name: '管理员列表'},
            { path: '/staffList', component: StaffList, name: '员工列表'},
            { path: '/staffChart', component: StaffChart, name: '员工统计'},
            { path: '/myCenter', component: MyCenter, name: '个人中心'}
        ]
    }
];

export default routes;