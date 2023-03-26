import VueRouter from 'vue-router'
import LoginPage from '@/pages/LoginPage'

const router = new VueRouter({
  // mode: 'hash', //hash||history
    routes: [
        {
          name: 'login',
          path: '/',
          component:LoginPage
        }
    ]
})

export default router
