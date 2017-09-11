<template>
  <div class="recharge" v-if="datap" id="recharge">
    <div class="getlobox">
      <ul class="clearfix">
        <li v-for="(item ,index) in datap " @touchend="chosep(item,index)" :class="{activeli:defauindex==index}">
          <strong>{{ parseInt(item.marketPrice)}}元</strong>
          <p>售价:{{item.truePrice}}元</p>
        </li>
      </ul>
      <div class="wxbtn" @click="gopay(1)">微信支付</div>
      <div class="zfbbtn" @click="gopay(2)">支付宝支付</div>
      <p class="mo" ><span @click="gomrecord">充值记录?</span><span @click="goexp">资费查询?</span></p>

    </div>
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
              datap:'',
              defauindex:0
            }
        },
      methods:{
        chosep(item,index){
          this.defauindex = index;
        },
        gomrecord(){
          this.$router.push('/mrecord')
        },
        goexp(){
          this.$router.push('/exp')
        },
        getlists(){
          let islogin = this.$local.fetch('xhtapelogin');
          let calldata ={ // 有记录的所有通话
            "number": "fy_combo_list",
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
              "password": '',
              "inviteCode ": "3188",
              "verifyCode": '',
              " districtCode ": "86",
              " district ": "中国",
//              "callee": this.phone.replace(/\-/g,''),
//              "calleeType": 1,//1：双向回拨 2：双向回拨指定显号
//              "showNumberType":1, // 1：显示号码 2：不显示号码
//              "userId":islogin.user_id,
//              "mobile": '',
//              "fy_account":'',
//              "isRecord": 1 , // 1：录音，2：不录音
//              "token":islogin.token// 登录时 返回的token
            }
          };
          HTTP.post('',calldata)
            .then((res)=>{
              console.log(res.data)
              if(res.data.status ==1){
                this.datap = res.data.data

              }else {
                myalertpTwo('myphone',false,res.data.msg,()=>{
                })
              }
            })
            .catch((err)=>{
              console.log(errr)
            })
        },
        gopay(key){
          let islogin = this.$local.fetch('xhtapelogin');
          let calldata ={ // 请求订单接口
            "number": "fy_charge",
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
              "password": '',
              "inviteCode ": "3188",
              "verifyCode": '',
              " districtCode ": "86",
              " district ": "中国",
              "userId":islogin.user_id,
              "mobile": '',
              "fy_account":'',
              "comboId":this.datap[this.defauindex].id,//商品ID
              "money":this.datap[this.defauindex].truePrice,//实际支付金额
              "token":islogin.token ,// 登录时 返回的token
              "paytype":1// 支付方式
            }
          };
          HTTP.post('',calldata)
            .then((res)=>{
              console.log(res.data)
              if(res.data.status ==1){
//                let  oid =res.data.data.ordercode;
//                this.gopayy(key,oid)
                if(key ==1){
                   window.location.href=res.data.data.yicardPayUrl;
                }else {
                   window.location.href=res.data.data.yicardPayUrl_Alipay;
                }
              }else {
                myalertpTwo('recharge',false,res.data.msg,()=>{
                })
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        gopayy(key,oid){
          let islogin = this.$local.fetch('xhtapelogin');
          let calldata ={ // 请求订单接口
            "number": "fy_youpay_url",
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
              "password": '',
              "inviteCode ": "3188",
              "verifyCode": '',
              " districtCode ": "86",
              " district ": "中国",
              "userId":islogin.user_id,
              "mobile": '',
              "fy_account":'',
              "comboId":this.datap[this.defauindex].id,//商品ID
              "money":this.datap[this.defauindex].truePrice,//实际支付金额
              "token":islogin.token ,// 登录时 返回的token
              "paytype":1,// 支付方式
              "ordercode":oid
            }
          };
          HTTP.post('',calldata)
            .then((res)=>{
              console.log(res.data)
              if(res.data.status ==1){
//                if(key ==1){
//                  window.location.replace(res.data.data.yicardPayUrl);
//                }else {
                  window.location.href=res.data.data.url
////                  window.location.replace(res.data.data.yicardPayUrl_Alipay);
//                }
              }else {
                myalertpTwo('recharge',false,res.data.msg,()=>{
                })
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }

      },
      computed:{

      },
      created(){
        this.getlists(); // 获取 价格 列表
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recharge{
  width: 100%;
  height: 100vh;
  background:#f1f1f1;
  padding-top: 1rem;
  box-sizing: border-box;
  font-size: 0.45rem;
}
.getlobox{
  background: #fff;
  padding: 0.4rem 0.4rem 3rem;


}
.getlobox ul{padding-bottom: 1rem}
.getlobox ul li{
   width: 2.8rem;
   height: 2rem;
  margin-right: 0.4rem;
  border:1px solid #0069ff;
  border-radius:3px;
  box-sizing: border-box;
  float: left;
  margin-bottom: 0.4rem;
  padding-top: 0.3rem;

}
.getlobox ul li:nth-of-type(3n+3){
  margin-right: 0rem;
}
.getlobox ul li strong{
  font-size: 0.5rem;
  color:#0069ff;
  font-weight: normal;
  font-family:PingFangSC-Semibold;
}
.activeli{ background:#ddebff;}
.getlobox ul li p{
  font-size: 0.3rem;
  color:#0069ff;
  padding-top: 0.1rem;
}
.wxbtn{
  height: 1.2rem;
  background:#38ca3f;
  border-radius:4px;
  line-height: 1.2rem;
  color: #fff;
  font-size: 0.45rem;
}
.zfbbtn{
  height: 1.2rem;
  background:#2b97f1;
  border-radius:4px;
  line-height: 1.2rem;
  color: #fff;
  font-size: 0.45rem;
  margin-top: 0.3rem;
}
.mo{
  font-size: 0.35rem;
  color: #0069ff;
  display: block;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0.2rem 0.4rem 0;
}
.mo span:nth-of-type(1){
  float: left;
}
.mo span:nth-of-type(2){
  float: right;
}
.mo span:hover{
  cursor: pointer;
}
</style>
