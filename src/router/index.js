import Vue from 'vue'
import Router from 'vue-router'
import commodity from './commodity'
import sale from './sale'
import customer from './customer'
import system from './system'
import tools from '../util/tools'

Vue.use(Router)
const mainPage = r => require.ensure([], () => r(require('../views/mainPage.vue')), 'mainPage');
const refreshPage = r => require.ensure([], () => r(require('../views/refreshPage.vue')), 'refreshPage');
const homePage = r => require.ensure([], () => r(require('../views/home/homePage.vue')), 'homePage');
const loginPage = r => require.ensure([], () => r(require('../views/login/loginPage.vue')), 'loginPage');
const registerPage = r => require.ensure([], () => r(require('../views/login/registerPage.vue')), 'registerPage');
const forgetPassword = r => require.ensure([], () => r(require('../views/login/forgetPassword.vue')), 'forgetPassword');

const router = new Router({
  routes: [
    {
      path: '/',
      component: loginPage,
      name:'登录'
    },
    {
      path: '/refresh',
      component: refreshPage,
    },
    {
      path: '/login',
      component: loginPage,
    },
    {
      path: '/register',
      component: registerPage,
    },
    {
      path: '/forgetPassword',
      component: forgetPassword,
    },
    {
      path: '/home',
      component: mainPage,
      children:[
        {path: "home", name: '首页', component: homePage,},
      ]
    },
    commodity,
    sale,
    customer,
    system
  ]
})

router.beforeEach((to,from,next)=>{
  let sessid = tools.getCookie('sessid');
  if(to.name == '登录'){
    if(sessid && sessid.length>0){
      next('/home/home')
    }else{
      next();
    }
  }
  else{
    next();
  }
})
export default router;
