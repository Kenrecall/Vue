// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios,Axios)

Vue.config.productionTip = false

import './assets/css/main'

import Tools from './until/tools'
Vue.use(Tools)

Vue.prototype.$remset(document, window)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
