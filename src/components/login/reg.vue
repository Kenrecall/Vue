<template>
  <div class="reg">
    <p >接受验证码的手机号：<span v-if="phone">+86 {{phone}}</span></p>
    <div class="regbox">
      <input type="text" value="" placeholder="请输入手机号" v-model="phone" ref="pullp">
      <div class="getlobtn" @click="getlobtn">{{regname}}</div>
      <input type="text" value="" placeholder="请输入验证码" v-model="yanm">
      <input type="password" value="" placeholder="请输入密码" v-model="paw1" >
      <input type="password" value="" placeholder="请再次输入密码" v-model="paw2">
    </div>
    <p class="errmsg" v-if="errmsg"><img src="../../assets/img/err.png" alt="">{{errmsg}}</p>
    <div :class="{regbtn:true}" @click="gologin">{{btnmsg}}</div>

  </div>
</template>

<script>

  import HTTP from '../../until/http'

  export default {
    name: '',
    data () {
        return {
            msg: '',
          errmsg:'',
          phone:'',
          btnmsg:'注册',
          regname:'获取验证码',
          paw1:'',
          paw2:'',
          yanm:'',
          title:''

        }
    },
    methods:{
      getlobtn(ev){
        let isphone =this.$checkphone(this.phone);
        if(isphone ){
            this.errmsg='';
          if(this.regname =='获取验证码'){
            ev.target.style.background='#ccc';
            let loigndata={
              "number": "fy_verify_code",
              "sign": "399de53a1d72278cc1bbdd56d4f54058",
              "param": {
                "idfa": "15648A49-CCCD-4127-AC6F-B22AE1A9C38",
                "imei": "",
                "mac": "02:00:00:00:00:00",
                "version": "1.0.1",
                " versionCode": "1.0.1",
                "jpushId ": "AkxiCETBhk6vxzyIfrIvDfJhPZbu4wqMYi9z3WQ8KELF",
                "deviceToken ": "",
                "token": "6d7d8fd48c138045a380e6461e3cbcbd1",
                "cellnet": "1.0.1",
                "sysver": "cn.nineton.artsignnew-gl",
                "clientname ": " iPhone8,1 ",
                "versionCode": "101",
                "platform": "h5",
                "mobile": this.phone,
                "password": "",
                "inviteCode ": "1234",
                "verifyCode": "1234"
              }
            };
            this.regname =59;
            clearInterval(timer)
            var timer = setInterval(()=>{
              this.regname -=1;
              if(this.regname == -1){
                  ev.target.style.background='#0069ff';
                  this.regname ='获取验证码';
                  clearInterval(timer)
              }
            },1000);
            HTTP.post('',loigndata)
              .then((res)=>{
                console.log(res.data)
              })
              .catch((err)=>{
                console.log(err)
              })
          }
        }else {
          this.errmsg= '请输入正确的手机号码'
          this.$refs.pullp.focus()
        }

      },
      gologin(){
        if(!this.$checkphone(this.phone)){
          this.errmsg ='请输入正确的手机号码';
          return false
        }
        if(!this.yanm){
          this.errmsg ='请输入验证码';
          return false
        }
        if(!this.paw1){
          this.errmsg ='请输入密码';
          return false
        }
        if(!this.paw2){
          this.errmsg ='请再次输入密码';
          return false
        }
        if(this.paw1.length<6 || this.paw2.length<6){
          this.errmsg ='密码长度不能小于6';
          return false
        }
        if(this.paw1 !=this.paw2){
          this.errmsg ='两次输入的密码不一样';
          return false
        }
        this.errmsg='';
        let regdata ={
          "number": "fy_register",
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
            "sysver": this.$local.fetch('xhsysver'),
            "clientname ": " iPhone8,1 ",
            "versionCode": "101",
            "platform": "h5",
            "mobile": this.phone,
            "password": this.paw1,
            "inviteCode ": "3188",
            "verifyCode": this.yanm,
            " districtCode ": "86",
            " district ": "中国"
          }
        };
        if(this.title ==2 ||  this.title ==3){  //  2 为忘记密码  3 为修改密码
          console.log('忘记密码') //
          regdata.number ='fy_find_pwd_back';
          regdata.param.password ='';
          regdata.param.newPwd =this.paw1;
          console.log(regdata)
          HTTP.post('',regdata)
            .then((res)=>{
              console.log(res.data)
              if(res.data.status ==1){
                console.log('找回密码成功')
//                if(this.title ==2){ // 这里 可以 让 修改密码成功后 自动登录
//
//                }else{
//
//                }
                this.$router.push('./login')
              }else {
                this.errmsg =res.data.msg;
              }
            })
            .catch((err)=>{
              console.log(err)
              this.errmsg =err.msg;

            })

        }else {
          console.log('注册')
          HTTP.post('',regdata)
            .then((res)=>{
              console.log(res.data)
              if(res.data.status ==1){

                this.$router.push('./login')
              }else {
                this.errmsg =res.data.msg;
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      }
    },

    created(){
      let ti = this.$route.query.title;
      this.title =ti;
      if(ti ==2){
          document.title ='忘记密码';
          this.btnmsg ='完成'
      }else if(ti ==1){
        document.title ='注册';
        this.btnmsg ='注册'
      }else if(ti ==3){
        document.title ='修改密码';
        this.btnmsg ='完成'
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .reg{
    background: #f1f1f1;
    width: 100%;
    height: 100vh;
  }
  .reg p{
    background: #f1f1f1;
    width: 100%;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.42rem;
    color: #b0b8c2;
  }
  .regbox{
    position: relative;
    background: #fff;
  }
  .reg input{
    background: #fff;
    width: 100%;
    height: 1.4rem;
    outline:none;
    border: 0;
    font-size: 0.4rem;
    color: #403b3b;
    padding-left: 0.4rem;
    border-top: 1px solid #e4e0e0;
    box-sizing: border-box;
    display: block;

  }
  .reg input:nth-of-type(1){
    width: 6rem;
    float: left;
    border-top: none;
  }
  .reg input:nth-of-type(4){
    border-bottom: 1px solid #e4e0e0;
    }
  .getlobtn{
    position: absolute;
    right: 0.4rem;
    top:0.2rem;
    height:1rem;
    background:#0069ff ;
    width: 2.6rem;
    color: #fff;
    line-height: 1rem;
    font-size: 0.38rem;
    border-radius: 6px;

  }
  .reg .errmsg{

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
  .reg .errmsg img{

    width: 0.75rem;
    height:0.75rem;
    position: absolute;
    top:0.15rem;
    left:0.1rem;
  }
  .regbtn{
    height: 1.3rem;
    background:#0069ff ;
    width: 9.2rem;
    margin: 0.5rem auto 0;
    color: #fff;
    font-size: 0.5rem;
    line-height: 1.3rem;
    border-radius: 6px;
  }
  .regbtn.bgc{
    background:#ccc ;
  }

</style>
