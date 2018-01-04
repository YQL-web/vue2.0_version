// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//promise 兼容处理
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/***************引入静态资源*******************/
import './element-variables.scss'

import './assets/scss/index.scss'
// 字体图标样式
import './fontdemo/style.css'
/*******************************/
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUi)
import Crumbs from './components/Crumbs.vue'
import AdsSelect from './components/AddressSelect.vue'
import Search from './components/Search.vue'
import SearchSelect from './components/SearchSelect.vue'
import Page from './components/Page.vue'
import Textarea from './components/Textarea.vue'

Vue.component('crumbs',Crumbs);
Vue.component('AdsSelect',AdsSelect);
Vue.component('Search',Search);
Vue.component('SearchSelect',SearchSelect);
Vue.component('Page',Page);
Vue.component('Textarea',Textarea);

import server from './server/index'
import axios from './axios/index'
import regExp  from './util/regExp'
import tools from './util/tools'

Vue.prototype.$http = axios
Vue.prototype.server = server
Vue.prototype.regExp = regExp
Vue.prototype.tools = tools

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
