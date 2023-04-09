import VueRouter from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import MainPage from '@/pages/MainPage'
import UserCenter from '@/pages/UserCenter'
import SetAdmin from '@/pages/SetAdmin'

const router = new VueRouter({
  // mode: 'hash', //hash||history
    routes: [
        {
          name: 'login',
          path: '/',
          component:LoginPage
        },
        {
          name: "mainpage",
          path: '/mainpage',
          component: MainPage
        },
        {
          name: "usercenter",
          path: '/usercenter',
          component: UserCenter,
        },
        {
          name: "setadmin",
          path: '/setadmin',
          component: SetAdmin,
        }
    ]
})

export default router
