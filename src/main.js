import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import ElementUI from 'element-ui'
import axios from "axios";
import VueRouter from "vue-router";
import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify'
import Vuetify from "vuetify";
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'

Vue.use(Vuetify)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线（任意组件间通信）
  }
}).$mount('#app')
