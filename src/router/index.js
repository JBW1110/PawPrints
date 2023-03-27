import VueRouter from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import MainPage from '@/pages/MainPage'

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
    ]
})

export default router
