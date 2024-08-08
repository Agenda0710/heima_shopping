import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/index.vue";
import Layout from "@/views/layout/index.vue";
import Search from "@/views/search/index.vue";
import ProDetail from "@/views/prodetail/index.vue";
import Pay from "@/views/pay/index.vue";
import MyOrder from "@/views/myorder/index.vue";
import SearchList from '@/views/search/list.vue'
import Cart from "@/views/layout/cart.vue";
import Category from "@/views/layout/category.vue";
import Home from "@/views/layout/home.vue";
import User from "@/views/layout/user.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: "/login", component: Login
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children:[
            {path:'/cart',component: Cart},
            {path: '/category',component: Category},
            {path: '/home',component: Home},
            {path: '/user',component: User},
        ]
    },
    {
        path: '/search', component: Search
    },
    {
        path: '/searchList',component: SearchList
    },
    {
        //动态路由传参，路由参数中携带商品id
        path: '/proDetail/:id', component: ProDetail
    },
    {
        path: 'pay',component: Pay
    },
    {
        path: 'myOrder',component: MyOrder
    }
]

const router = new VueRouter({
    routes
})

export default router
