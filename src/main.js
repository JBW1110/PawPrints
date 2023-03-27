import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import ElementUI from 'element-ui'
import axios from "axios";
import VueRouter from "vue-router";
import 'element-ui/lib/theme-chalk/index.css';
import Vuetify from "vuetify";

Vue.use(Vuetify)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router,
  Vuetify,
  render: h => h(App)
}).$mount('#app')
