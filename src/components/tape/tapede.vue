<template>
  <div class="tapede" id="tapede">
      <div class="tapedebox">
        <div class="det">
          <img src="../../assets/img/ic_playert.png" alt="" class="deimg1">
          <p >拨打<span v-if="!ischangen">{{datas.voice_title}}</span><input type="text" value="" class="changen" v-show="ischangen" @blur="blurfname" v-model="datas.voice_title" ref="changenin" />的录音 <img src="../../assets/img/ed.png" alt="" @click="changename"></p>
          <ul class="deul">
            <li>文件大小<span>{{voice_record_size}}kb</span></li>
            <li>录音日期<span>{{time1}}</span></li>
            <li>录音时间<span>{{time2}}</span></li>
            <li>主叫号码<span>{{datas.caller}}</span></li>
            <li>被叫号码<span>{{callee}}</span></li>
          </ul>
          <div class="changet" v-if="!ischanget" @click="changetex">{{datas.voice_remark | note}}</div>
          <textarea v-if="ischanget" ref="changet" @blur="blurte" v-model="datas.voice_remark"></textarea>
        </div>
        <div class="deb">
          <div class="timeline" @touchmove="move" @touchend="endlin">
             <p class="outl"  ref="pout">
               <span class="acl" ref="spin"></span>
             </p>
            <span class="ntime">{{starttime}}</span>
            <span class="atime">{{alltime}}</span>
          </div>
          <audio :src="surl" ref="myaudio"></audio>
          <div class="debtns">
            <img src="../../assets/img/downl.png" alt="" class="dedown"  @touchend="godown">
            <img src="../../assets/img/ic_player.png" alt="" class="deplay" @touchend="goplay" v-if="istop">
            <img src="../../assets/img/ic_stop.png" alt="" class="deplay" @touchend="gostop" v-if="!istop">
            <img src="../../assets/img/dedel.png" alt="" class="dede" @touchend="deleteta" >
          </div>
        </div>
      </div>
      <Alertt :message="alertmsg" :istwo="true"  v-if="isalert" @alertyes="alertyesfn" @alertno="alertnofn"></Alertt>
      <div class="downla" v-if="isdowan">
        <div class="downbox">
          <div class="proclose" @click=" deleteFn " >×</div>
          <span class="dtitle">录音下载</span>
          <label for="">邮箱:<input type="email"   @blur="isemail" v-model="email"></label>

          <p>系统将会把录音发送到您的指定邮箱,请注意查收</p>
          <span class="downbtn" @click="downfn">下载</span>
        </div>
      </div>
    <div id="loading" v-if="isloading"><img src="../../assets/img/loading-1.gif" alt=""></div>
  </div>
</template>

<script>

  import {bindFn ,secondToMin,createTime,timefn ,minTime,myalertpTwo,isEmail} from '../../until/toolfn'
 import Alertt from '@/alertt'
  import HTTP from '../../until/http'
  export default {
    name: '',
    data () {
      return {
        msg: '',
        ischanget:false,
        ischangen:false,
        oname:'',
        callee:'',
        datas:'',
        voice_record_size:'' ,//  录音大小
        surl:'',//  录音地址
        istop:true,
        atime:'',
        timer:null,
        starttime:'00:00:00',
        alertmsg:{
          title: '',
          no:    '取消',
          yes:   '确定'
        },
        isalert:false,
        oldtextarea:'', //备注内容
        currentTime:0 ,// 拖动的时候 的时间
        isdowan:false, // 下载弹层
        email:'', // 下载时  提供的邮箱
        isloading:false


      }
    },
    components:{
      Alertt
    },
    computed:{
      time1(){
        return  timefn(new Date( Number(this.datas.create_time+'000'))).split(' ')[0]
      },
      time2(){
        return   timefn(new Date( Number(this.datas.create_time+'000'))).split(' ')[1]
      },
      alltime(){
          return createTime(this.atime);
      },

    },
    filters:{ // 过滤器
      note:function(value){
        return value ? value:'暂无备注(点击修改)'
      }
    },
    methods:{
      changename(){
        this.ischangen =true;
        setTimeout(()=>{
          this.$refs.changenin.focus();
        },10)

      },
      blurfname(){
        this.ischangen =false;

        if(this.datas.voice_title ==''){
          this.datas.voice_title = this.oname;
        }else if(this.datas.voice_title.length>14){
          myalertpTwo('tapede',false,'昵称信息长度不能超过14位');
          this.datas.voice_title = this.oname;
        }else {
          console.log(this.datas.voice_title.length)
          this.changetitle() // 调用 修改函数
        }
      },
      changetex(){ // 点击修改备注 changet
        this.ischanget = true;
//        if(this.textarea =='暂无备注信息(点击修改)'){
//          this.textarea = '';
//        }
        setTimeout(()=>{
          this.$refs.changet.focus();
        },10)
      },
      blurte(){
        this.ischanget =false;
//        if(this.datas.voice_remark ==''){
//          this.datas.voice_remark = this.oldtextarea;
//        }else
        if(this.datas.voice_remark.length > 50){
          this.datas.voice_remark = this.oldtextarea;
          myalertpTwo('tapede',false,'备注信息长度不能超过50位');
        }else{
          this.changetitle() // 调用 修改函数
        }
      },
      goplay(){
        this.istop =false;
        let spin = this.$refs.spin;
        let myaudio =this.$refs.myaudio;
        myaudio.currentTime = this.currentTime;
        myaudio.play();

        console.log(myaudio.duration)
        clearInterval(this.timer);
        this.timer=setInterval(()=>{

          var currentTime = myaudio.currentTime+1;
          this.currentTime = myaudio.currentTime;
          var playTime = secondToMin(currentTime);
          this.starttime =playTime;
          let wt =(currentTime/parseInt(myaudio.duration)).toFixed(4)*100+"%";
          if(parseInt( wt) >100){
              wt= '100%';
          }
          spin.style.width = wt;
        },1000);


        bindFn(this.$refs.myaudio,'ended',()=>{
           // alert(1) 成功监听 播放结束
          this.istop =true;
          clearInterval(this.timer);

        })

        if(this.$refs.myaudio.paused){
          clearInterval(this.timer);
        }
      },
      gostop(){
        this.istop =true;
        clearInterval(this.timer);
        this.$refs.myaudio.pause();
      },
      move(ev){
        let myaudio =this.$refs.myaudio;
        var touch = ev.targetTouches[0];
        let w =touch.pageX-12;
        let spin = this.$refs.spin;
        let pout = this.$refs.pout;
        let ow =pout.clientWidth;
        if(w<ow && w >6){
          spin.style.width = w +'px';
        }else if(w>ow){
          spin.style.width = ow +'px';
        }else if(w <30){
          spin.style.width = 1 +'px';
        }
        let per = ((spin.clientWidth)/ow).toFixed(2);
        console.log(this.atime.replace('秒',''))
        let  cerTime =per*( minTime(this.atime).replace('秒',''));
        let intiem =cerTime.toFixed(0) >0 ?cerTime.toFixed(0) :0;
        myaudio.currentTime =intiem  ;
        this.currentTime =intiem  ;
        this.starttime =secondToMin(intiem);
        console.log(this.starttime)

      },
      endlin(ev){
        let myaudio =this.$refs.myaudio;
        var touch = ev.changedTouches[0];
        let w = touch.pageX-12;
        let spin = this.$refs.spin;
        let pout = this.$refs.pout;
        let ow =pout.clientWidth;
        if(w<ow && w >30){
          spin.style.width = w +'px';
        }else if(w>ow){
          spin.style.width = ow +'px';
        }else if(w <30){
          spin.style.width = 1 +'px';
        }
        let per = ((spin.clientWidth)/ow).toFixed(2);
        console.log(per)
        console.log(this.atime.replace('秒',''))
        let  cerTime =per*( minTime(this.atime).replace('秒',''));
        let intiem =cerTime.toFixed(4);
        console.log(parseInt(cerTime.toFixed(4)) )
        if(per == 1.00){
          myaudio.currentTime =myaudio.duration;
        }else {
          myaudio.currentTime =intiem  ;
          this.currentTime =intiem  ;
        }
        this.starttime =secondToMin(intiem);
      },
      deleteta(){
        this.isalert = true;
        this.alertmsg.title = '确认删除该通话录音？';
      },
      alertyesfn(){ // 确认删除录音
        let logindata =this.$local.fetch('xhtapelogin');
        let logindataall ={ // 有记录的所有通话
          "number": "fy_delete_voice_record",
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
            "password": '',
            "inviteCode ": "3188",
            "verifyCode": '',
            " districtCode ": "86",
            " district ": "中国",
            "userId":logindata.user_id,
            "mobile":'',
            "fy_account":'',
            "record_id":this.datas.record_id,
            "token":logindata.token
          }
        };
        HTTP.post('',logindataall)
          .then((res)=>{
            console.log(res.data)
            if(res.data.status ==1){
              this.$router.go(-1)
            }else {
              //账户 异地登录
            }

          })
          .catch((err)=>{
            console.log(errr)
          })
        this.isalert = false;
      },
      alertnofn(){
        this.isalert = false;
      },
      godown(){ // 下载 录音 点击图标
        this.isdowan = true;


      },
      isemail(){
         if(!isEmail(this.email)){
           myalertpTwo('tapede',false,'请输入正确的邮箱')
         }

      },
      downfn(){
        if(!isEmail(this.email)){
          myalertpTwo('tapede',false,'请输入正确的邮箱')
          return false
        }
        this.isloading =true;
        let logindata =this.$local.fetch('xhtapelogin');
        let logindataall ={ //  下载录音
          "number": "fy_user_email_send",
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
            "password": '',
            "inviteCode ": "3188",
            "verifyCode": '',
            " districtCode ": "86",
            " district ": "中国",
            "userId":logindata.user_id,
            "mobile":logindata.mobile,
            "fy_account":'',
            "record_id":this.datas.record_id,
            "token":logindata.token,
            "email":this.email
          }
        };
        HTTP.post('',logindataall)
          .then((res)=>{
            console.log(res.data);
            this.isloading =false;
            if(res.data.status ==1){
              let  ms =res.data.msg =='success' ? '请求数据成功，即将发送到您的邮箱！' :'请求数据成功，即将发送到您的邮箱！'
              myalertpTwo('tapede',false,ms,()=>{
                this.isdowan = false;
              })
            }else {
              myalertpTwo('tapede',false,res.data.msg)
            }
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      changetitle(){ // 修改备注  和  标题
        let logindata =this.$local.fetch('xhtapelogin');
        let logindataall ={ // 有记录的所有通话
          "number": "fy_modify_record_info",
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
            "password": '',
            "inviteCode ": "3188",
            "verifyCode": '',
            " districtCode ": "86",
            " district ": "中国",
            "userId":logindata.user_id,
            "mobile":logindata.mobile,
            "fy_account":'',
            "record_id":this.datas.record_id,
            "token":logindata.token,
            "voice_remark":this.datas.voice_remark,
            "voice_title":this.datas.voice_title
          }
        };
        HTTP.post('',logindataall)
          .then((res)=>{
            console.log(res.data);
            if(res.data.status ==1){

            }else {
              //账户 异地登录
            }

          })
          .catch((err)=>{
            console.log(err)
          })
      },
      deleteFn(){
          this.isdowan = false;
      }
    },
    created(){
      let record_id = this.$route.query.id ;
      console.log(record_id);
      let datas =this.$store.state.dedata;
      this.datas = datas[record_id];
      console.log(this.datas)
      this.oname = datas[record_id].voice_title;
      this.atime =datas[record_id].real_call_minute;
      this.callee =datas[record_id].callee;
      this.oldtextarea =datas[record_id].voice_remark;
      console.log(this.oldtextarea)

      let logindata =this.$local.fetch('xhtapelogin');
      let logindataall ={ // 有记录的所有通话
        "number": "fy_voice_urlget",
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
          "password": '',
          "inviteCode ": "3188",
          "verifyCode": '',
          " districtCode ": "86",
          " district ": "中国",
          "userId":logindata.user_id,
          "mobile":logindata.mobile,
          "fy_account":'',
          "record_id":this.datas.record_id,
          "token":logindata.token
        }
      };
      HTTP.post('',logindataall)
        .then((res)=>{
          console.log(res.data)
          if(res.data.status ==1){
           this.voice_record_size =res.data.data.voice_record_size; //
           this.surl =res.data.data.url; // 三方平台的 录音地址
          }else {
            //账户 异地登录
          }

        })
        .catch((err)=>{
          console.log(errr)
        })

    },
    beforeRouteLeave(to,from,next){
      clearInterval(this.timer)
      next()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tapedebox{
  height: 14rem;
  margin: 16px ;
  box-shadow:6px 10px 6px 0 #bfbfbf;
  border-radius: 6px;
  font-size: 0.36rem;

}
.det{
  height: 10rem;
  background-image:linear-gradient(-180deg, #0069ff 0%, #4691f6 100%);
  border-radius: 6px 6px 0 0;
  color: #ffffff;
}
.deimg1{
  margin-top: 0.6rem;
}
.det p{
  height: 1rem;
  line-height: 1rem;
  font-family:PingFangSC-Regular;

}
.det p span{
  padding: 0 0.3rem;
}
.changen{
  outline: none;
  border: 0;
  height: 0.8rem;
  width: 3.2rem;

  margin: 0 0.1rem;
  border-radius: 4px;
}
.det p img{
  display: inline-block;
  width: 0.43rem;
  height: 0.43rem;
  padding: 0.22rem;
  vertical-align:middle;
  position: relative;
  top:-0.03rem;

}
.deul{
  height: 4.6rem;
  margin-top: 0.1rem;
  margin-left:12px;
  margin-right:12px;
  border-bottom: 1px #ffffff solid;
  padding-bottom: 0.2rem;
}
.deul li{
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: left;
  padding-left: 0.4rem;
  color:#ddebff;

}
.deul li span{
  padding-left: 2rem;

}
.changet{
  text-align: left;
  padding:0.2rem 0.8rem 0;
  font-family:PingFangSC-Regular;
  font-size:0.3rem;
  color:#ddebff;
}
textarea{
  margin-top: 0.4rem;
  width: 8rem;
  height: 1.4rem;
  resize:none;
  outline: none;
  border: 0;
  line-height: 0.6rem;
  text-indent: 0.4rem;
  font-size:10px;

}
.deb{
  height: 4rem;
  background:#ffffff;
  border-radius:0 0 6px 6px;
  padding: 12px;
  box-sizing: border-box;

}
.timeline{
  padding-top: 0.3rem;
  height:0.7rem;
  position: relative;

}
.outl{
  height: 4px;
  background:#ddebff;
  border-radius: 6px;
}
  .acl{
    display: block;
    height: 4px;
    background:#0069ff;
    width:0.01%;
    border-radius: 6px;
    position: relative;
  }
.acl:after{content: ""; position: absolute; top: -4px; right:-6px;width: 12px; height:12px; border-radius: 100%;background:#0069ff;box-shadow:0 2px 4px 0 rgba(0,105,255,0.50);}
.ntime{
  font-size: 0.2rem;
  float: left;
  line-height: 0.8rem;
  color:#999999;
}
.atime{
  font-size: 0.2rem;
  float: right;
  line-height: 0.8rem;
  color:#999999;
}
.debtns{
  height: 2rem;
  padding-top: 0.3rem;
  position: relative;

}
.dedown{
  width: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top:1rem;
}
.deplay{
  width: 1.8rem;

}
  .dede{
    width: 0.76rem;
    position: absolute;
    right: 0.5rem;
    top:0.8rem;
  }
  .downla {
    display: -webkit-box;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 668;
    overflow: hidden;
    font-size: 0.4rem;

  }
  .downbox{
    width: 8rem;
    height: 6.8rem;
    background: #ffffff;
    border-radius: 10px;
    position: relative;

  }
  .dtitle{
    line-height: 1.4rem;
    display: block;
    font-size: 0.45rem;
    background: #488bc3;
    color: #ffffff;
    border-radius: 8px 8px 0 0 ;
  }
.downbox label{
  display: block;
  text-align: left;
  width: 7rem;
  margin: 0.4rem auto;
  font-size: 0.45rem;
}
.downbox input{
  height: 1rem;
  border: 1px solid #cccccc;
  outline: none;
  width: 5.5rem;
  margin-left: 0.2rem;
  padding-left: 0.2rem;
  border-radius: 4px;

}
.downbox p{
  width: 6.6rem;
  margin:  0 auto;
  font-size: 0.34rem;
  text-align: left;
  padding: 0.2rem;
  color: #afaeae;
}
  .downbtn{
    display: inline-block;
    font-size: 0.45rem;
    background: #0095ff;
    padding: 0.2rem  1rem ;
    margin-top: 0.6rem;
    color: #ffffff;
    border-radius: 18px;
    box-shadow: 3px 3px 2px #ccc;
  }
.proclose{
  width: 0.8rem;
  height:0.8rem;
  line-height: 0.8rem;
  text-align: center;
  position: absolute;
  top:-0.2rem;
  right: -0.2rem;
  font-size: 0.7rem;
  cursor: pointer;
  border-radius: 50%;
  background: #c5cdd6;

}
</style>
