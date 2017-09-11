<template>
  <div class="myphone" id="myphone">
    <div class="no_phone" >
      <p class="noph"  v-if="alldatas.length == 0">为保证通话、录音数据正常使用，请确保余额充足，拨打国际电话请先添加国家编号</p>
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
          <span v-if="!phone">拨打固话需要加区号</span>
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
  </div>
</template>

<script>
  import {timefn,bindFn,myalertpTwo,GetDateStrH} from '../../until/toolfn'
  import Alertt from '@/alertt'
  import HTTP from '../../until/http'
  export default {
    name: '',
    data () {
      return {
          msg: '',
        phone:'',
        money:'',// 账户余额
        alldatas:'',
        ischecked:false,
        isknow:false,  //  关闭 我知道了弹层
        iscalling:false, //  关闭 正在呼叫弹层
      }
    },
    components:{
      Alertt
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
        console.log(check)
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
        console.log(myknow)
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
            console.log(res.data)
            if(res.data.status ==1){
              this.money =res.data.data.balance;
            }else {
              // 账户 异地登录
            }
          })
          .catch((err)=>{
            console.log(errr)
          });
      }

    },
    computed:{
      thephone(){

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
//        this.money =logindata.balance;
        console.log('已经登录')
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
                this.alldatas =res.data.data;
              console.log(this.alldatas)
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
        this.mymoney();


      }

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
</style>
