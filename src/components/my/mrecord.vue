<template>
  <div class="mrecord">
    <ul>
      <li class="mrecordli" v-for="item in lists">
        <p><span>充值{{item.combo}}-{{mobile}}</span><span>{{ item.price_value}}</span></p>
        <p><span>{{ item.create_time | timefilter }}</span><span>充值成功</span></p>
      </li>
      <!--<li class="mrecordli">-->
        <!--<p><span>充值50元-13290060825</span><span>49.90</span></p>-->
        <!--<p><span>2017年7月12日</span><span>充值成功</span></p>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
  import {timefn} from '../../until/toolfn'
  import HTTP from '../../until/http'
  export default {
    name: '',
    data () {
      return {
        msg: '',
        lists:[],
        mobile:''
      }
    },
    methods:{
      getlists(){
        let islogin = this.$local.fetch('xhtapelogin');
        this.mobile = islogin.mobile;
        let calldata ={
          "number": "fy_consume_log",
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
            "page":1,
            "token":islogin.token// 登录时 返回的token
          }
        };
        HTTP.post('',calldata)
          .then((res)=>{
            console.log(res.data)
            if(res.data.status ==1){
              this.lists = res.data.data

            }else {
              myalertpTwo('myphone',false,res.data.msg,()=>{

              })
            }
          })
          .catch((err)=>{
            console.log(errr)
          })
      },
    },
    filters:{ // 过滤器
      timefilter:function(value){
        return timefn(new Date( Number(value+'000'))).split(' ')[0];
      }
    },
    created(){
      this.getlists()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mrecord{
  padding-top: 0.4rem;
}
.mrecord ul{
  border-top: 1px  solid #dedede;
  background: #ffffff;
}
.mrecordli{
  height: 2rem;
  font-size: 0.4rem;
  border-bottom: 1px  solid #dedede;
}
.mrecordli p{
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  text-align: left;
}
.mrecordli p:nth-of-type(1){
  font-family:PingFangSC-Regular;
  font-size:16px;
  color:#333333;
  height: 1.2rem;
   line-height: 1.2rem;
}
.mrecordli p:nth-of-type(1) span:nth-of-type(2){
  float: right;
  font-family:PingFangSC-Regular;
  font-size:20px;
  color:#333333;
}
.mrecordli p:nth-of-type(2){
  font-family:PingFangSC-Regular;
  font-size:13px;
  color:#666666;
  height: 0.4rem;
  line-height: 0.4rem;
}
.mrecordli p:nth-of-type(2) span:nth-of-type(2){
  float: right;
  font-family:PingFangSC-Regular;
  font-size:13px;
  color:#38ca3f;
}
</style>
