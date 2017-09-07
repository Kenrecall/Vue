<template>
  <div class="login">
      <div class="lohead" style="display: none;">
        登录
        <img src="../../assets/img/back.png" alt="">
      </div>
    <input type="text" value="" placeholder="手机号" autocomplete="off"  v-model="phone">
    <input type="password" value="" placeholder="密码" autocomplete="off" v-model="psw">
    <p class="errmsg" v-if="errmsg"><img src="../../assets/img/err.png" alt="">{{errmsg}}</p>
    <div class="loginbtn" @click="gologin">登录</div>
    <div class="loginm">
      <span @click="goreg">注册</span>
      <span @click="forreg">忘记密码？</span>
    </div>
  </div>
</template>

<script>
  import HTTP from '../../until/http'
  export default {
      name: '',
      data () {
          return {
            msg: '',
            phone:'',
            psw:'',
            errmsg:''
          }
      },
    methods:{
      goreg(){
          this.$router.push('/reg')
      },
      forreg(){
        this.$router.push({path:'/reg',query:{title:2}})
      },
      gologin(){

        let phonec = this.$checkphone(this.phone)
        if(!this.phone){
          this.errmsg ='请输入手机号码';
          return false
        }
        if(!phonec){
          this.errmsg ='请输入正确的手机号码';
          return false
        }
        if(!this.psw){
          this.errmsg ='请输入密码';
          return false
        }
        if(this.psw.length <6){
          this.errmsg ='密码长度小于6';
          return false
        }
        this.errmsg ='';
        let logindata ={
          "number": "fy_login",
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
            "sysver": "cn.nineton.artsignnew-gl",
            "clientname ": " iPhone8,1 ",
            "versionCode": "101",
            "platform": "h5",
            "mobile": this.phone,
            "password": this.psw,
            "inviteCode ": "3188",
            "verifyCode": '',
            " districtCode ": "86",
            " district ": "中国"
          }
        };
        HTTP.post('',logindata)
          .then((res)=>{
            console.log(res.data)
            if(res.data.status ==1){
              let loca= res.data.data;
              this.$local.save('xhtapelogin',loca); //存储本地登录状态
//              this.$store.commit('pulllogin',res.data.data);
              let key = this.$route.query.key ? this.$route.query.key :'';
              console.log(key);
              this.$router.push('./'+key)
            }else {
              this.errmsg =res.data.msg;
            }

          })
          .catch((err)=>{

          })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lohead{
  height:1.2rem;
  font-size: 0.6rem;
  line-height: 1.2rem;
  background: #f6f6f6;
}
.login{

}
.login input{
  background: #fff;
  width: 100%;
  height: 1.4rem;
  outline:none;
  border: 0;
  font-size: 0.43rem;
  color: #999999;
  padding-left: 0.4rem;
  box-sizing: border-box;

}
.login input:nth-of-type(1){
  margin-top: 0.6rem;
  margin-bottom: 0.01rem;
}
.loginbtn{
  height:1.2rem;
  background:#0069ff ;
  width: 9.2rem;
  margin: 0.5rem auto 0.4rem;
  color: #fff;
  line-height: 1.2rem;
  font-size: 0.5rem;
  border-radius: 6px;

}
.loginm{
  height: 0.8rem;
  line-height: 0.8rem;
  color:#0069ff ;
  font-size: 0.43rem;
  padding: 0 0.4rem;
}
.loginm span:nth-of-type(1){
 float: left;
}
.loginm span:nth-of-type(2){
  float: right;
}
.errmsg{

  width: 9.2rem;
  margin: 0.2rem auto 0;
  line-height: 1rem;
  font-size: 0.35rem;
  height: 1rem;
  text-align: left;
  color: #da5c5c;
  background: #f5e5e5;
  position: relative;
  padding-left: 0.8rem;
  box-sizing: border-box;
  border-radius: 6px;
}
 .errmsg img{

  width: 0.75rem;
  height:0.75rem;
  position: absolute;
  top:0.15rem;
  left:0.1rem;
}
</style>
