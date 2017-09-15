/**
 * Created by Administrator on 2017/8/28.
 */

let remset=function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize =  (clientWidth / 10) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}

// localStorage 本地存储
let local ={
  save(key,value){
    localStorage.setItem(key,JSON.stringify(value))
  },
  fetch(key){
    return  JSON.parse( localStorage.getItem(key) ) || ''
  }
}
let checkphone =function (telNum){  // 可以不做插件 直接 定义为函数 做为方法使用
  if((!/^1[0-9]{10}$/.test(telNum))){
    return false;
  }else {
    return true;
  }
};

export default {
  install:function (vm) {
    vm.prototype.$local =local;
    vm.prototype.$remset =remset;
    vm.prototype.$checkphone =checkphone;


  }
}
