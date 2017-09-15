<template>
  <div class="myphone" id="myphone">
    <div class="no_phone" >
      <ol class="noph"  v-if="alldatas.length == 0">
        <li>本系统不会消耗您的移动运营商话费，请放心使用。</li>
        <li>系统采用双向回拨技术，拨打电话后请注意接听系统来电。</li>
      </ol>
      <ul class="alltapes" v-if="alldatas.length != 0">
        <li  v-for="item in alldatas" @click="headcall(item.callee)">
          <img src="../../assets/img/sp_bg.png" alt="" class="">
          <span>{{item.callee}}</span>
          <span>{{item.create_time | timefilter }}</span>
        </li>
      </ul>
    </div>
    <div class="phone_box">
        <div class="pboxhead">
          <span v-if="!phone">请输入要拨打的手机号码</span>
          <span class="numphone">{{phone}}</span>
          <div class="debtn"  @touchstart="denum">
            <img src="../../assets/img/debg.png" alt="" class="pbg1">
            <img src="../../assets/img/debg2.png" alt="" class="pbg2">
          </div>

        </div>
        <ul class="pboxm">
          <li data="1" @touchstart="getnum">1</li>
          <li data="2" @touchstart="getnum">2 <span data="2">A B C</span></li>
          <li data="3" @touchstart="getnum">3<span data="3">D E F</span></li>
          <li data="4" @touchstart="getnum">4<span data="4">G H I</span></li>
          <li data="5" @touchstart="getnum">5<span data="5">J K L</span></li>
          <li data="6" @touchstart="getnum">6<span data="6">M N O</span></li>
          <li data="7" @touchstart="getnum">7<span data="7">P Q R S</span></li>
          <li data="8" @touchstart="getnum">8<span data="8">T U V</span></li>
          <li data="9" @touchstart="getnum">9<span data="9">W X Y Z</span></li>
          <li data="*" @touchstart="getnum">*</li>
          <li data="0" @touchstart="getnum" >0<span data="0">+</span></li>
          <li data="#" @touchstart="getnum">#</li>
        </ul>
      <div class="callbox">
        <div class="core">
          <span>当前余额</span><br>
          <span>{{money}}元</span>
        </div>
        <div  class="callbtn" @click="gologin">
          <img src="../../assets/img/callbg.png" alt="" class="callbg1">
          <img src="../../assets/img/callbg2.png" alt="" class="callbg2">
        </div>
        <div class="coreser" @click="goserver">
          <img src="../../assets/img/severer.png" alt="">
        </div>
      </div>
    </div>
    <div class="player" v-if="isknow">
      <div class="playerbox">
        <img src="../../assets/img/phone_labg1.png" alt="">
        <p>成功发送电话请求5秒左右，请接听系统来电，以便我们为您接通对方。</p>
        <strong>不在提示？ <label :class ="{checklab:true,check_it:ischecked}"  @click="mycheck"><input type="checkbox" value=" " class="check" ref="check"></label></strong>
        <div class="laybtn" @click="gomycall">我知道了</div>
      </div>
    </div>
    <div class="alertcallbg"  v-if="iscalling">
      <div class="acallbox">
        <img src="../../assets/img/dh_phone.png" alt="">
        <span>呼叫中...</span>
        <p>请注意接听系统回拨电话</p>
        <strong @click="cloiscalling">关闭</strong>
      </div>

    </div>
    <div class="loginnote" v-if="islo">
      <div class="loginbox">
        <img src="../../assets/img/phone_bg1.png" alt="" class="lbg1">
        <div class="proclose" @click="lclose" >×</div>
        <p class="lp1" @click="goreP">立即领取话费</p>
        <p class="lp3">您有一份新人礼包</p>
        <p class="lp4"><span>20分钟</span>免费通话录音券待领取</p>
      </div>
    </div>
    <div  class="step" v-if="isnomoney">
      <div class="pf" >
        <input type="text" placeholder="输入手机号码"  class="sin1" ref="pullp" v-model="phones">
        <input type="text"   class="sin2" v-model="namecode"> <span class="spp1" @click="getlobtn">{{regname}}</span>
        <p class="sp1" @click="newlog">立即领取话费</p>
        <p class="errmsg" v-if="nameerrmsg"><img src="../../assets/img/err.png" alt="">{{nameerrmsg}}</p>
        <p class="sp2">通话录音的收费系统不会使用运营商话费，请在【资费详情】查看详情</p>
        <div class="stepclose" @click="sclose" >×</div>
      </div>
    </div>
    <div class="loginnotel" v-if="isgo">
      <div class="loginboxl">
        <img src="../../assets/img/phone_bg2.png" alt="" class="lbg1l" @click="isgof">
        <div class="proclose"  >×</div>
        <p class="lp1l" @click="isgof">马上体验</p>
        <p class="lp3l">20分钟通话录音已到账</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {timefn,bindFn,myalertpTwo,GetDateStrH,myBrowser} from '../../until/toolfn'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Alertt from '@/alertt'
  import HTTP from '../../until/http'
  export default {
    name: '',
    data () {
      return {
          msg: '',
        phone:'',
        ischecked:false,
        isknow:false,  //  关闭 我知道了弹层
        iscalling:false, //  关闭 正在呼叫弹层
        islo:false,//  关闭 赠送通话费用 没登陆 时候 true 第1步
        isnomoney:false, //关闭 新手注册 第2步
        isgo:false, //关闭 马上体验 第3步
        regname:'获取验证码',
        nameerrmsg:'' ,// 验证码 返回错误信息
        phones:'' ,// 获取验证码时候的手机号码
        namecode:'',// 验证码


      }
    },
    components:{
      Alertt,
      swiper,
      swiperSlide
    },
    methods:{
      getnum(ev){
        let n = ev.target.getAttribute('data')
        if(this.phone.length<13){
          let np = this.phone;
          if(np.length ==3 || np.length ==8){
            this.phone = this.phone+'-'+n;
          }else {
            this.phone =this.phone +n;
          }
        }
      },
      denum(){
          let nn = this.phone.length;
          if(nn ==10 || nn ==5){
            this.phone = this.phone.substring(0,this.phone.length-2)
          }else {
            this.phone = this.phone.substring(0,this.phone.length-1)
          }
      },
      gologin(){
        let islogin = this.$local.fetch('xhtapelogin')
        if(islogin.mobile){// 已经登录
          if(!this.$checkphone(this.phone.replace(/\-/g,''))){
            myalertpTwo('myphone',false,'请输入正确的手机号码');
            return false
          }
          let  myknow =this.$local.fetch('xhisknow'); //存储本地 我知道了 状态
          console.log(myknow.isknow)
          if(myknow.isknow){
            this.mycall();
          }else {
            this.isknow =true;
          }
        }else {
            this.$router.push({path:'/login',query:{key:'phone'}})
        }
      },
      gomycall(){
        this.ischecked = false;
        this.isknow =false;
        this.mycall();
      },
      mycall(){
        let islogin = this.$local.fetch('xhtapelogin')
        let calldata ={ // 有记录的所有通话
          "number": "fy_round_call",
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
            "callee": this.phone.replace(/\-/g,''),
            "calleeType": 1,//1：双向回拨 2：双向回拨指定显号
            "showNumberType":1, // 1：显示号码 2：不显示号码
            "userId":islogin.user_id,
            "mobile": '',
            "fy_account":'',
            "isRecord": 1 , // 1：录音，2：不录音
            "token":islogin.token// 登录时 返回的token
          }
        };
        HTTP.post('',calldata)
          .then((res)=>{
            console.log(res.data)
            if(res.data.status ==1){
                this.iscalling = true;
              console.log('呼叫返回数据')

            }else {
              myalertpTwo('myphone',false,res.data.msg,()=>{
                if(res.data.status == 3005){
                  // 正在处理 通话
                }else if(res.data.status == 1004) {
                  // 账户 异地登录
                  this.$router.push({path:'/login',query:{key:'phone'}})
                }

              })
            }
          })
          .catch((err)=>{
            console.log(errr)
          })
      },
      mycheck(){  // 我知道了的 选择按钮
        let check = this.$refs.check.checked;
        this.ischecked = check;
        if(!check){
          this.$local.save('xhisknow',{isknow:false}); //存储本地 我知道了 状态
        }else {
          this.$local.save('xhisknow',{isknow:true}); //存储本地 我知道了 状态
        }
      },
      headcall(headphone){
//        myalertpTwo('myphone',true,'测试弹层')
        this.phone =headphone;
        let  myknow =this.$local.fetch('xhisknow'); //存储本地 我知道了 状态
        if(myknow.isknow){
          this.mycall();
        }else {
          this.isknow =true;
        }
      },
      cloiscalling(){
        this.iscalling =false;
        this.mymoney()
      },
      gore(){
        this.$router.replace({path:'/reg',query:{key:'phone',sysver:this.sysver,title:1}})
      },
      golo(){
        this.$router.replace({path:'/login',query:{key:'phone',sysver:this.sysver}})
      },
      lclose(){ //  关闭立即领取话费 界面
        this.islo= false;
      },
      sclose(){
        this.isnomoney = false;
      },
      goreP(){  // 点击 立即领取话费   展示新手注册或者登陆
        this.islo = false;
        this.isnomoney = true;
      },
      isgof(){
        this.isgo = false;
      },
      goserver(){  // 在线客服
        this.$router.replace({path:'/server',query:{sysver:this.sysver}})
      },
      getlobtn(ev){ // 发送验证码接口
        let isphone =this.$checkphone(this.phones);
        if(isphone ){
          this.nameerrmsg='';
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
                "sysver": this.$local.fetch('xhsysver').sysver,
                "clientname ": " iPhone8,1 ",
                "versionCode": "101",
                "platform": "h5",
                "mobile": this.phones,
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
          this.nameerrmsg= '请输入正确的手机号码';
          this.$refs.pullp.focus()
        }

      },
      newlog(){
        let isphone =this.$checkphone(this.phones);
        if(isphone ){
          this.nameerrmsg='';
          if( this.namecode.length !=4){
            this.nameerrmsg='验证码错误';
            return false
          }
          let loigndata={
            "number": "fy_login_with_mobile_verifycode",
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
              "sysver": this.$local.fetch('xhsysver').sysver,
              "clientname ": " iPhone8,1 ",
              "versionCode": "101",
              "platform": "h5",
              "mobile": this.phones,
              "verifyCode":this.namecode
            }
          };
          HTTP.post('',loigndata)
            .then((res)=>{
              console.log(res.data)
              if(res.data.status ==1){
                let loca= res.data.data;
                this.$local.save('xhtapelogin',loca); //存储本地登录状态
                let isRegister =loca.isRegister;
                this.getphonedatas(loca);// 获取页面数据
                console.log(isRegister)
                if(isRegister ==1){ // 为新注册账号
                  this.isgo = true;
                }else {  // 老账号登陆
                  myalertpTwo('myphone',false,'抱歉,您的账号已经领取过新人礼包,不能重复领取',()=>{
                      this.isnomoney = false;
                  });
                }
              }else {
                this.nameerrmsg= res.data.msg;
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }else {
          this.nameerrmsg= '请输入正确的手机号码';
          this.$refs.pullp.focus()
        }
      },
      getphonedatas(logindata){
        let logindataall ={ // 有记录的所有通话
          "number": "fy_call_record",
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
            "page":1,
            "isRecord":0, // 1 是有录音的记录  0 表示默认 全部通话记录
            "record_id":'',
            "token":logindata.token// 登录时 返回的token
          }
        };
        HTTP.post('',logindataall)
          .then((res)=>{
            console.log(res.data)
            if(res.data.status ==1){
//              this.alldatas =res.data.data;
              this.$store.commit('getalldatas',res.data.data)

            }else {
              // 账户 异地登录
              myalertpTwo('myphone',false,res.data.msg,()=>{
                this.$router.push({path:'/login',query:{key:'phone'}})
              })
            }
          })
          .catch((err)=>{
            console.log(errr)
          });
      }
    },
    computed:{
      money(){
        return this.$store.state.userdata ? this.$store.state.userdata.balance:"0.00"
      },
      swiper() {
        return this.$refs.mySwiper.swiper;
      },
      sysver(){
        return  this.$local.fetch('xhsysver').sysver
      },
      alldatas(){
          let  data = this.$store.state.alldatas;
          return data ? data:[]
      }



    },
    filters:{ // 过滤器
      timefilter:function(value){
        let date =timefn(new Date( Number(value+'000'))).split(' ')[0]; //拨打电话的 日期
        let dateH =timefn(new Date( Number(value+'000'))).split(' ')[1];
        let ndate = timefn( new Date() ).split(' ')[0]; // 今天 日期
        let tdate = GetDateStrH(-24).split(' ')[0];// 昨天 日期
        let ttdate = GetDateStrH(-48).split(' ')[0];// 前天 日期
        var title =timefn(new Date( Number(value+'000')));
        if(date == ndate){
          title ='今天 '+dateH;
        }else if(date == tdate){
          title ='昨天 '+dateH;
        }else if(date == ttdate){
          title ='前天 '+dateH;
        }

        return title
      }
    },
    created(){
      let logindata =this.$local.fetch('xhtapelogin');
      if(logindata.mobile){// 已经登录
        console.log('已经登录')
        this.getphonedatas(logindata);
        this.$store.dispatch('mymoney')
      }else{// 没有登录
        this.islo= true;
      }

    },
    mounted () {
      //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.alertcallbg{
  display: -webkit-box;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left:0;
  z-index: 68;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  background: url("../../assets/img/alertcallbg2.png") no-repeat ;
  background-size: cover;
}
.alertcallbg .acallbox{
  background:rgba(0,0,0,0.50);
  border-radius:5px;
  width:6rem;
  height:5.4rem;
}
.acallbox img{
  padding-top: 0.8rem;
  width:1.4rem;
}
.acallbox span{
  display: block;
  width: 100%;
  line-height: 1.2rem;
  font-size: 0.4rem;
  color: #ffffff;
}
.acallbox p{
  font-family:PingFangSC-Regular;
  font-size:0.35rem;
  color:rgba(255,255,255,0.60);

}
.acallbox strong{
  font-family:PingFangSC-Regular;
  font-size:0.35rem;
  color:rgba(255,255,255,0.60);
  display: block;
  height: 0.6rem;
  line-height: 0.6rem;
  padding-top: 0.3rem;

}
.loginnote{
  display: -webkit-box;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left:0;
  z-index: 68;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  background:rgba(0,0,0,0.4);
  font-size: 0.38rem;
}
.loginbox{
  border-radius:5px;
  width:8rem;
  height:8.6rem;
  position: relative;
}
.loginbox .lbg1{
  width: 8rem;
  position: absolute;
  top:0;
  left:0;
}
.proclose{
  width: 0.8rem;
  height:0.8rem;
  line-height: 0.8rem;
  text-align: center;
  position: absolute;
  bottom:-2rem;
  left: 3.6rem;
  font-size: 0.7rem;
  cursor: pointer;
  border-radius: 50%;
  color: #828282;
  background: #c5cdd6;
  z-index: 100;

}
  .lp1{
    position: absolute;
    left:10%;
    bottom:0.4rem;
    height: 1.1rem;
    background: #3278ED;
    border-radius: 5px;
    width: 80%;
    color: #fff;
    line-height: 1.1rem;

  }
.lp2{
  position: absolute;
  left:10%;
  bottom:0.6rem;
  height: 1.1rem;
  border-radius: 5px;
  width: 80%;
  line-height: 1.1rem;
  color: #FFFFFF;
  background: #9495AA;

}
.lp3{
  position: absolute;
  left:10%;
  bottom:4.3rem;
  border-radius: 5px;
  width: 80%;
  color: #FFFFFF;
  font-size: 0.45rem;
}
.lp4{
  position: absolute;
  left:10%;
  bottom:3.6rem;
  border-radius: 5px;
  width: 80%;
  color: #FFFFFF;
  font-size: 0.45rem;
}
.lp4 span{
  color: #ffed63;
}
  .step{
    display: -webkit-box;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left:0;
    z-index: 68;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    background:rgba(0,0,0,0.4);
    font-size: 0.38rem;
  }
.pf{
  width: 8rem;
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  padding: 0.6rem;
  box-sizing: border-box;
  text-align: left;
}
.pf input{
 height: 1.3rem;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 0.2rem;
  background: #f9f3f3;
  color: #524d4d;
  border: 1px solid #cccccc;
  outline: none;

}
.sin1{
  margin-top: 0.4rem;
  width: 100%;
}
.sin2{
  width: 3.7rem; vertical-align:middle;
  display: inline-block;
}
.spp1{
  margin-top: 0.4rem;
  margin-left: 0.29rem;
  height: 1.3rem;
  display: inline-block;
  background: #3278ED;
  width: 2.7rem;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  line-height: 1.3rem;
}
.sp1{
  display: block;
  width: 100%;
  height: 1.2rem;
  background: #3278ED;
  border-radius: 5px;
  color: #fff;
  line-height: 1.2rem;
  text-align:center;
  margin-top: 0.6rem;
}
.sp2{
  margin-top: 0.3rem;
  display: block;
  color: #a7a0a0; ;
}
.errmsg{
  margin-top: 0.2rem;
  display: block;
  width: 100%;
  line-height: 0.8rem;
  font-size: 0.3rem;
  height: 0.8rem;
  text-align: left;
  color: #da5c5c;
  background: #f5e5e5;
  position: relative;
  padding-left: 0.8rem;
  box-sizing: border-box;
  border-radius: 4px;
}
.errmsg img{
  width: 0.75rem;
  height:0.75rem;
  position: absolute;
  top:0.0rem;
  left:0.1rem;
}
.stepclose{
  width: 0.8rem;
  height:0.8rem;
  line-height: 0.8rem;
  text-align: center;
  position: absolute;
  bottom:-1.2rem;
  left: 3.6rem;
  font-size: 0.7rem;
  cursor: pointer;
  border-radius: 50%;
  color: #828282;
  background: #c5cdd6;
  z-index: 100;

}

.loginnotel{
  display: -webkit-box;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left:0;
  z-index: 68;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  background:rgba(0,0,0,0.4);
  font-size: 0.38rem;
}
.loginboxl{
  border-radius:5px;
  width:8rem;
  height:8.6rem;
  position: relative;
}
.loginboxl .lbg1l{
  width: 8rem;
  position: absolute;
  top:0;
  left:0;
}
.proclosel{
  width: 0.8rem;
  height:0.8rem;
  line-height: 0.8rem;
  text-align: center;
  position: absolute;
  bottom:-2rem;
  left: 3.6rem;
  font-size: 0.7rem;
  cursor: pointer;
  border-radius: 50%;
  color: #828282;
  background: #c5cdd6;
  z-index: 100;

}
.lp1l{
  position: absolute;
  left:10%;
  bottom:0.4rem;
  height: 1.1rem;
  background: #3278ED;
  border-radius: 5px;
  width: 80%;
  color: #fff;
  line-height: 1.1rem;

}
.lp3l{
  position: absolute;
  left:10%;
  bottom:3.8rem;
  border-radius: 5px;
  width: 80%;
  color: #FFFFFF;
  font-size: 0.45rem;
}

</style>
