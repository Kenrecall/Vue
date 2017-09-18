import Vue from 'vue'
import Router from 'vue-router'



import Home from '@/Home'
import Phone from '@/phone/phone'

import Tape from '@/tape/tape'
import tapede from '@/tape/tapede'

import My from '@/my/my'
import recharge from  '@/my/recharge'
import mrecord from  '@/my/mrecord'
import expenses from  '@/my/expenses'
import set from  '@/my/set'
import exp from  '@/my/exp'
import problem from '@/my/problem'
import server from '@/my/server'


import login from '@/login/login'
import reg from '@/login/reg'


import contSingleList from '@/contSingleList'

Vue.use(Router)
import {myalertpTwo} from '../until/toolfn.js'
let router = new Router({
  mode:'history',
  linkActiveClass:'is_active',
  base: '/vuetape/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:'/phone',//
      children:[
        {
          path:'/phone',
          component:Phone,
          meta:{
            index:1,
            title:"通话"
          }
        },
        {
          path:'/tape',
          component:Tape,
          meta:{
            index:2,
            login:true,
            title:'我的录音'
          }
        },
        {
          path:'/my',
          component:My,
          name:My,
          meta:{
            index:3,
            login:true,
            title:"用户中心"
          }
        },
      ]
    },
    {
      path:'/login',
      component:login,
      meta:{
        title:'登录'
      }
    },
    {
      path:'/reg',
      component:reg,
      meta:{
        title:'注册'
      }
    },
    {
      path:'/recharge',
      component:recharge,
      meta:{
        title:'充值中心'
      }
    },
    {
      path:'/mrecord',
      component:mrecord,
      meta:{
        title:'充值记录'
      }

    },
    {
      path:'/expenses',
      component:expenses,
      meta:{
        title:'历史账单'
      }
    },
    {
      path:'/tapede',
      component:tapede,
      meta:{
        title:'录音详情'
      }
    },
    {
      path:'/set',
      component:set,
      meta:{
        title:'设置'
      }
    },
    {
      path:'/exp',
      component: exp,
      meta:{
        title:'资费详情'
      }
    },
    {
      path:'/problem',
      component: problem,
      meta:{
        title:'常见问题'
      }
    },
    {
      path:'/server',
      component: server,
      meta:{
        title:'在线客服'
      }
    },
    {
      path:'/contsingleList',
      component:contSingleList,
      mate:{
        title:'测试下拉刷新'
      }
    },
    {
      path:'*',
      redirect:'/',
    }
  ]
})
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title?to.meta.title:'通话录音';
  // console.log(to.redirectedFrom)
  // console.log(to)
  // let keys =to.redirectedFrom;
  // let key ='';
  // if(keys){
  //     key= keys.split('=')[1]
  // };
  // if(keys && key){
  //     // myalertpTwo('app',false,'重定向'+ key);
  //     next('/'+key)
  //
  //
  // }else

    // myalertpTwo('app',false,'没有重定向直接跳转的地址'+ to.path);
    let islogin = to.meta.login;
  console.log(to)
    let isloginxh = Vue.prototype.$local.fetch('xhtapelogin').mobile;
    let sysver =    Vue.prototype.$local.fetch('xhsysver').sysver
    document.title = to.meta.title?to.meta.title:'通话录音';
    if(islogin && !isloginxh){ //表示还没有登录
      next({path:'/login',query:{key:to.path.replace('/',''),sysver:sysver}})
    }else{
      to.query.sysver ='test';
      next()
    }





})
export default router
