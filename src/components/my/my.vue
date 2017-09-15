<template>
  <div class="myu">
    <ul class="myut">
      <li>
         <span>账户号码</span>
         <span>{{userdata.mobile}}</span>
      </li>
      <li>
          <span>余额</span>
          <span>{{userdata.balance}}元</span>
      </li>
    </ul>
    <ul class="myumo">
      <router-link :to="{path:'/recharge',query:{sysver:sysver}}" tag="li">
        <span >充值</span>
        <img src="../../assets/img/more.png" alt="">
      </router-link>
      <router-link :to="{path:'/expenses',query:{sysver:sysver}}" tag="li">
        <span>历史账单</span>
        <img src="../../assets/img/more.png" alt="">
      </router-link>
    </ul>
    <ul class="myumo">
      <router-link :to="{path:'/problem',query:{sysver:sysver}}" tag="li">
        <span>常见问题</span>
        <img src="../../assets/img/more.png" alt="">
      </router-link>
      <router-link :to="{path:'/server',query:{sysver:sysver}}" tag="li">
        <span>在线客服</span>
        <img src="../../assets/img/more.png" alt="">
      </router-link>
    </ul>
    <router-link :to="{path:'/set',query:{sysver:sysver}}" tag="div" class="myset">
      <span>设置</span>
      <img src="../../assets/img/more.png" alt="">
    </router-link>
  </div>
</template>

<script>
  import {myalertpTwo} from '../../until/toolfn'
  import HTTP from '../../until/http'
  export default {
      name: '',
      data () {
        return {
          msg: '',
          userdata:{
            balance:'0.00',
            mobile:'18888888888'
          }
        }
      },
      computed:{
        sysver(){
          return  this.$local.fetch('xhsysver').sysver
        }
      },
      methods:{
        mymoney(){
          let logindata =this.$local.fetch('xhtapelogin');
          //  账户余额信息
          let moneydata ={ // 有记录的所有通话
            "number": "fy_userinfo",
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
              "userId":logindata.user_id,
              "mobile": '',
              "fy_account":'',
              "token":logindata.token// 登录时 返回的token
            }
          };
          HTTP.post('',moneydata)
            .then((res)=>{
              console.log('再次请求余额');
              if(res.data.status ==1){
                this.userdata =res.data.data;
              }else {
                // 账户 异地登录

              }
            })
            .catch((err)=>{
              console.log(errr)
            });
        },
//        server(){
//
//          _MEIQIA('showPanel')
//        }
      },
      created(){
//        _MEIQIA('init'); // 在线客服
//        myalertpTwo('app',false,window.location.href);
        this.mymoney();
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myu{
  background:#f1f1f1;
  width: 100%;
  height: 100vh;
  font-size: 0.43rem;
  padding-top: 0.4rem;
  box-sizing: border-box;
  text-align: left;
}
.myut {
  height: 2.6rem;
  border-bottom: 1px solid #e2e2e2 ;
  border-top: 1px solid #e2e2e2 ;
  padding-left: 0.6rem;
  background: #fff;


}
.myut li{
  height: 1.3rem;
  background: #fff;
  line-height: 1.3rem;
  box-sizing: border-box;
}
.myut li:nth-of-type(1){
  border-bottom: 1px solid #e2e2e2 ;
}
.myut li span:nth-of-type(2){
   float: right;
  padding-right: 0.6rem;
  font-weight: normal;

}
.myumo{
  height: 2.6rem;
  border-bottom: 1px solid #e2e2e2 ;
  border-top: 1px solid #e2e2e2 ;
  padding-left: 0.6rem;
  background: #fff;
  margin-top: 0.4rem;

}
.myumo li{
  height: 1.3rem;
  background: #fff;
  line-height: 1.3rem;
  box-sizing: border-box;
  position: relative;
}
.myumo li:nth-of-type(1){
  border-bottom: 1px solid #e2e2e2 ;
}
.myumo li img{
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  top:0;
  right: 0.1rem;
  padding:0.3rem 0.3rem;

}
.myumo1{
  height: 1.3rem;
  border-bottom: 1px solid #e2e2e2 ;
  border-top: 1px solid #e2e2e2 ;
  padding-left: 0.6rem;
  background: #fff;
  margin-top: 0.4rem;

}
.myumo1 li{
  height: 1.3rem;
  background: #fff;
  line-height: 1.3rem;
  box-sizing: border-box;
  position: relative;
}
.myumo1 li img{
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  top:0;
  right: 0.1rem;
  padding:0.3rem 0.3rem;

}


.myset{
  width: 100%;
  height: 1.3rem;
  background: #fff;
  line-height: 1.3rem;
  padding-left: 0.6rem;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  margin-top: 1rem;
}
.myset img{
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  top:0rem;
  right: 0.1rem;
  padding:0.3rem 0.3rem;

}
</style>
