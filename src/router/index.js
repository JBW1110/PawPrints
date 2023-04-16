import VueRouter from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import MainPage from '@/pages/MainPage'
import UserCenter from '@/pages/UserCenter'
import SetAdmin from '@/pages/SetAdmin'
import PostManage from '@/pages/PostManage'
import AnimalFile from '@/pages/AnimalFile'
import AnimalAdoption from '@/pages/AnimalAdoption'

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
        },
        {
          name: "postmanage",
          path: '/postmanage',
          component: PostManage,
        },
        {
          name: "animalfile",
          path: '/animalfile',
          component: AnimalFile,
        },
        {
          name: "animaladoption",
          path: '/animaladoption',
          component: AnimalAdoption,
        }
    ]
})

export default router
