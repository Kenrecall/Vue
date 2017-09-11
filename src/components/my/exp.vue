<template>
  <div id="exp">
    <ul class="expul">
      <li><span>通话资费</span><span>{{price}}</span></li>
      <li><span>容量资费</span><span>{{price}}</span></li>
    </ul>
    <p class="expp1">系统提示</p>
    <p class="expp2" v-html="msg"></p>

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
            price:''
          }
      },
      created(){
          let logindataall ={ // 有记录的所有通话
            "number": "fy_call_price",
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
              " country ": "",
            }
          };
          HTTP.post('',logindataall)
            .then((res)=>{
              if(res.data.status ==1){
                let msgarr =(res.data.data.systemInfo+'。').replace(/\。/g,'。<br>');
                this.msg =msgarr;
                this.price = res.data.data.basic.callPrice;
              }else {
                // 账户 异地登录
                myalertpTwo('exp',false,res.data.msg)
              }
            })
            .catch((err)=>{
              console.log(err)
            });
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#exp{
 background: #ffffff;
  font-size: 0.43rem;
  padding-bottom: 1rem;
  padding-top: 0.3rem;
}
.expul{
  background:#f6f6f6;
  width: 80%;
  height: 2.8rem;
  font-size: 0.4rem;
  margin: 0.4rem auto;
  padding:0.2rem 0.5rem;
  box-sizing: border-box;
}
.expul li{
  line-height: 1.2rem;
  height:1.2rem;
  border-bottom: 1px solid #d5d5d5;
  font-family:PingFangSC-Regular;
  color:#666666;
}
.expul li:nth-of-type(2){
  border-bottom: none;
}
.expul li span:nth-of-type(1){
  float: left;
}
.expul li span:nth-of-type(2){
  float: right;
}
.expp1{
  font-size: 0.45rem;
  line-height: 1rem;
  font-family:PingFangSC-Regular;
  color:#666666;
}
.expp2{
  padding: 0 10%;
  font-size: 0.34rem;
  font-family:PingFangSC-Regular;
  color:#999999;
  text-align: left;
}

</style>
