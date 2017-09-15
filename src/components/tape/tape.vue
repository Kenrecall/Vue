<template>
  <div class="tape">
      <div class="ontape" v-if="!istape">
        <img src="../../assets/img/img_zwth.png" alt="">
      </div>
    <ul class="tapem" v-if="istape">
      <li v-for="(item ,index) in tapedata" @click="gotdetali(item,index)">
        <img src="../../assets/img/smphone.png" alt="" class="taimg1">
        <p>拨打 {{item.callee }} 的录音</p>
        <p>时长：{{item.real_call_minute}}</p>
        <p>{{item.create_time | timefilter }}</p>
        <div class="isintape" v-if="item.voice_record_status==0">处理中</div>
        <img src="../../assets/img/more.png" alt="" class="taimg2" v-if="item.voice_record_status==1" >
      </li>
    </ul>
  </div>
</template>

<script>
  import HTTP from '../../until/http'
  import {timefn,myalertpTwo} from '../../until/toolfn'
  export default {
    name: '',
    data () {
      return {
        msg: '',
        istape:false,
      }

    },
    filters:{ // 过滤器
      timefilter:function(value){
        return timefn(new Date( Number(value+'000')))
      }
    },
    methods:{
      gotdetali(item,index){
        this.$router.push({path:'/tapede',query:{id:index,sysver:this.sysver}})
      }
    },
    computed:{
      sysver(){
        return  this.$local.fetch('xhsysver').sysver
      }
    },
    created(){
      let logindata =this.$local.fetch('xhtapelogin');
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
          "isRecord":1, // 1 是有录音的记录  0 表示默认 全部通话记录
          "record_id":'',
          "token":logindata.token// 登录时 返回的token
        }
      };
      HTTP.post('',logindataall)
        .then((res)=>{
          console.log(res.data)
          if(res.data.status ==1){
            if(res.data.data.length !=0){
              this.tapedata  =res.data.data;
              this.istape = true
              this.$store.commit('pulldedate',res.data.data)
            }else {
              this.istape = false;
            }
          }else {
            // 账户 异地登录
            myalertpTwo('app',false,res.data.msg,()=>{
              this.$router.push({path:'/login',query:{key:'phone'}})
            })
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tape{
  background:#f1f1f1;
  padding-bottom: 2.2rem;

}
.ontape{
  width: 100%;
  background:#f1f1f1;
}
.ontape img{
  width: 5rem;
  margin-top: 3rem;
}
.tapem{
  margin-top: 0.4rem;
  font-size: 0.5rem;
  text-align: left;

}

.tapem li{
  padding: 0.4rem 0.9rem;
  height: 2rem;
  background: #ffffff;
  margin-bottom: 0.2rem;
  line-height: 0.7rem;
  font-size: 0.35rem;
  color:#666666;
  position: relative;
}
.tapem li p:nth-of-type(1){
  font-size: 0.4rem;
  color:#333333;
}
.tapem li .taimg1{
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  left:0.1rem;
  top:0.4rem;
}
.tapem li .taimg2{
  position: absolute;
  padding: 0.3rem;
  width: 0.7rem;
  height: 0.7rem;
  right:0.1rem;
  top:0.7rem;
}
.isintape{
  height: 0.6rem;
  width: 1.7rem;
  position: absolute;
  top:1.1rem;
  right: 0.5rem;
  color:#0069ff ;
  background: url("../../assets/img/t11.png") no-repeat right;
  background-size: contain;
}
</style>
