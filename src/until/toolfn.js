/**
 * Created by Administrator on 2017/8/30.
 */

// 将系统时间 转为  2017-09-04
let timefn=function (time){
  var myTime = time;
  var iYear = myTime.getFullYear();
  var iMonth = myTime.getMonth()+1;
  var iDate = myTime.getDate();
  var iHours = myTime.getHours();
  var iMin = myTime.getMinutes();
  var iSec = myTime.getSeconds();

  var str = iYear+ '-' +toTwo(iMonth)+'-'+ toTwo(iDate)+' '+ toTwo(iHours)+':'+ toTwo(iMin)+':'+ toTwo(iSec);
  return str
}
//这个是  在当前时间  加几小时时间  8小时  或者 减多少小时 前天 昨天
function GetDateStrH(AddDayCount) {
  var dd = new Date();
  dd.setHours(dd.getHours() + AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  var H = dd.getHours();
  var M = dd.getMinutes();
  if ((m + "").length == 1) {
    m = "0" + m;
  }
  if ((d + "").length == 1) {
    d = "0" + d;
  }
  if ((H + "").length == 1) {
    H = "0" + H;
  }
  if ((M + "").length == 1) {
    M = "0" + M;
  }
  return y + "-" + m + "-" + d + " " +H + ":" + M ;
}


function toTwo(n) {    //  转换为 带0的
  return  n < 10 ?  '0' + n : '' + n;
}
// 兼容 事件绑定
function bindFn(obj, evname, fn) {   // 绑定函数
    if (obj.addEventListener) {
        obj.addEventListener(evname, fn, false);
    } else {
        obj.attachEvent('on' + evname, function() {
            fn.call(obj);
        });
    }
}
function createTime(t) { // 1小时2分钟12秒 转换为  01:02:12
  var las =t.replace('小时',':').replace('分钟',':').replace('秒','');
  var  kp =las.split(':').map(function (item) {
    return toTwo(item)
  })
  var arr =[];
  if(kp.length ==1){
    arr=['00','00'].concat(kp)
  }else if(kp.length ==2){
    arr=['00'].concat(kp)
  }else if(kp.length ==3){
    arr  =kp;
  }
  return arr.join(':')
}
// 计算时间 将时间 890 秒 转换为  01:12:01
//  t 为数字  不带 秒
function secondToMin(t) {
  var s =Math.floor(t);
  var HH = Math.floor(s / 3600);
  var MM = Math.floor((s-HH*3600) /60);
  var SS = s % 60;
  if (HH < 10)
    HH = "0" + HH;
  if (MM < 10)
    MM = "0" + MM;
  if (SS < 10)
    SS = "0" + SS;
  var min =HH+":"+ MM + ":" + SS;
  return min.split('.')[0];
}
function minTime(t) { // 1小时2分钟12秒 转换为  多少5220秒
  console.log(t)
  var las =t.replace('小时',':').replace('分钟',':').replace('秒','');
  console.log(las)
  var  kp =las.split(':')
  console.log(kp)
  if(kp.length ==1){
    return t
  }else if(kp.length ==2){
    return Number( kp[0])*60 + Number( kp[1]) +'秒'
  }else if(kp.length ==3){
    return Number( kp[0])*3600 + Number( kp[1])*60 +Number( kp[2])+'秒'
  }

}
// 弹层说明 只有确定按钮
// alert 弹层 优化函数  //没有函数  就只是提示  有函数 则执行
function myalertpTwo(id,istwo,message,fn1,fn2){
  //var str1 = '<div class="mianpger-boxbtn1lay"></div>';
  var iswrap = document.getElementById('city-a-wrap')
  if(!iswrap){
    var div = document.createElement("div");
    var str1 ='';
    if(istwo){
      str1 = '<div id="city-a-boxsp1">取消</div><div id="city-a-boxsp2">确定</div>';
    }else{
      str1 = '<div id="city-a-boxsp2" style="display: block;width: 100%">确定</div>';
    }
    var div_html ='<div id="city-a"><p id="city-a-boxp1">'+message+'</p>'+str1+'</div>';
    div.setAttribute("id", "city-a-wrap");
    var fdiv =document.getElementById(id);
    fdiv.appendChild(div);


    div.innerHTML =div_html;
    var btn2= document.getElementById('city-a-boxsp2'); //city-a-boxsp2

    btn2.onclick = function(){
      var fdiv1 =document.getElementById(id);
      var fwrap =document.getElementById('city-a-wrap');
      fdiv1.removeChild(fwrap);
      fn1&&fn1()

    };
    if(istwo){ // 取消事件
      var btn1= document.getElementById('city-a-boxsp1'); //city-a-boxsp2
      btn1.onclick = function(){
        var fdiv1 =document.getElementById(id);
        var fwrap =document.getElementById('city-a-wrap');
        fdiv1.removeChild(fwrap);
        fn2&&fn2()

      }
    }

  }

}
// myalertpTwo('n_wrap','策划书')

function isEmail(str){  // 邮箱验证
  var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  return reg.test(str);
};
function checkphone(telNum){ // 手机验证
  if((!/^1[0-9]{10}$/.test(telNum))){
    return false;
  }else {
    return true;
  }
};
function myBrowsers(){
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  if (userAgent.indexOf("Opera") > -1) { //判断是否Opera浏览器
    return "Opera"
  };
  if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
    return "FF";
  }
  if (userAgent.indexOf("Chrome") > -1){//判断是否Chrome浏览器
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
    return "Safari";
  }
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { //判断是否IE浏览器
    return "IE";
  };
}
function myBrowser(){ // 苹果手机浏览器
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
    return true
  }else {
    return false
  }
}
function myIphone(){  // 苹果手机

  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  if (userAgent.indexOf("iPhone") > -1) { //判断是否Safari浏览器
    return true
  }else {
    return false
  }
}
//
export {timefn ,bindFn,createTime ,secondToMin ,minTime ,myalertpTwo ,GetDateStrH ,isEmail,myBrowser,myIphone}
