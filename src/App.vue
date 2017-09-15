<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//  import {myBrowser,myIphone} from './until/toolfn'
  import HTTP from './until/http'
export default {
  name: 'app',
  created(){
//    let isSafari =myBrowser();
//    let isiPhone =myIphone();
//    if(!isSafari && isiPhone){  // 判断 苹果手机主屏幕
//      this.$local.save('isiPhone',true);
//    }else {
//      this.$local.save('isiPhone',false);
//    }

    console.log(this.$route.redirectedFrom)
    let keys =this.$route.redirectedFrom;
    if(keys){
      let urlarr = this.$route.redirectedFrom.split('=');
      console.log(urlarr);
      let key = urlarr[urlarr.length-1];
      let sysver='';
      if(urlarr.length>2){
        sysver =urlarr[1].split('&')[0]
      }else {
        sysver = key;
      }
      let xhsysver =this.$local.fetch('xhsysver');
      console.log(xhsysver.sysver)
      if(!xhsysver.sysver){
        this.$local.save('xhsysver',{sysver:sysver});
      }
      console.log(sysver)
      console.log(key)
      if(key){
        this.$router.push({path:'/'+key,query:{sysver:sysver}})
      };
      let logindata =this.$local.fetch('xhtapelogin');
      let logindataall ={ // 有记录的所有通话
        "number": "fy_visit_count_statistics",
        "sign": "9faf35d8e4a1647c083c6e2d299a2e30",
        "param": {
          "idfa": "15648A49-CCCD-4127-AC6F-B22AE1A9C38",
          "imei": "",
          "mac": "02:00:00:00:00:00",
          "version": "1.0.1",
          " versionCode": "1.0.1",
          "jpushId ": "AkxiCETBhk6vxzyIfrIvDfJhPZbu4wqMYi9z3WQ8KELF",
          "deviceToken ": "",
          "cellnet": "1.0.1",
          "sysver": this.$local.fetch('xhsysver').sysver,
          "clientname ": " iPhone8,1 ",
          "versionCode": "101",
          "platform": "h5",
          "password": '',
          "inviteCode ": "3188",
          "verifyCode": '',
          " districtCode ": "86",
          " district ": "中国",

        }
      };
      HTTP.post('',logindataall)
        .then((res)=>{
          console.log(res.data)
          if(res.data.status ==1){

          }else {
            //账户 异地登录
          }
        })
        .catch((err)=>{
          console.log(errr)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
