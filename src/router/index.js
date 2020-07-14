import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../components/Login.vue'
const Login = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/Login.vue')

//import Home from '../components/Home.vue'
const Home = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/Home.vue')

//import Welcome from '../components/Welcome.vue'
const Welcome = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/Welcome.vue')

//import Users from '../components/user/Users.vue'
const Users = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/user/Users.vue')

//import Rights from '../components/power/Rights.vue'
const Rights = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/power/Rights.vue')

//import Roles from '../components/power/Roles.vue'
const Roles = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/power/Roles.vue')

//import Cate from '../components/goods/Cate.vue';
const Cate = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/goods/Cate.vue')

//import Params from '../components/goods/Params.vue';
const Params = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/goods/Params.vue')

//import List from '../components/goods/List.vue';
const List = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/goods/List.vue')

//import Add from '../components/goods/add.vue';
const Add = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/goods/add.vue')

//import Order from '../components/order/Order.vue'
const Order = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/order/Order.vue')

//import Report from '../components/report/Report.vue';
const Report = () => import(/* webpackChunName: "login_home_welcome "*/ '../components/report/Report.vue')



Vue.use(VueRouter)



const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/Welcome',
      children: [{
          path: '/Welcome',
          component: Welcome
        },
        {
          path: "/users",
          component: Users
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/categories',
          component: Cate
        },
        {
          path: '/params',
          component: Params
        },
        {
          path: '/goods',
          component: List
        },
        {
          path: '/goods/add',
          component: Add
        },
        {
          path: '/orders',
          component: Order
        },
        {
          path: '/reports',
          component: Report
        }
      ]
    }
  ]
})

//挂载导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();

})

// 解决Loading chunk (\d)+ failed问题
router.onError((error) => {
  console.error(error)
  const pattern = /Loading chunk/g
  // const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed && error.type === 'missing') {
    // const targetPath = $router.history.pending.fullPath
    router.push(targetPath)
  }
})

export default router