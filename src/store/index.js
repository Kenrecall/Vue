/**
 * Created by Administrator on 2017/8/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import HTTP from '../until/http'
let store = new Vuex.Store({
  state:{
    dedata:'',
    userdata:"",
    alldatas:''
  },
  mutations:{
    pulldedate(state,paload){
      state.dedata =paload;
    },
    userdata(state,paload){
      state.userdata =paload;
    },
    getalldatas(state,paload){
      state.alldatas =paload;
      console.log(paload)
    }



  },
  actions:{
    getdatas(context,paload){
      let logindata =Vue.prototype.$local.fetch('xhtapelogin');
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
          "sysver": Vue.prototype.$local.fetch('xhsysver').sysver,
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
          "page":paload.page,
          "isRecord":1, // 1 是有录音的记录  0 表示默认 全部通话记录
          "record_id":'',
          "token":logindata.token// 登录时 返回的token
        }
      };
      HTTP.post('',logindataall)
        .then((res)=>{
          console.log(res.data)
          if(res.data.status ==1){
            if(res.data.data.length ==0){

            }else {
              context.commit('pulldedate', res.data.data)
            }
          }else {
            // 账户 异地登录
//            this.$router.replace({path:'/login',query:{key:'tape'}})
          }
        })
        .catch((err)=>{
          console.log(err)
        })

    },
    mymoney(context){
      let logindata =Vue.prototype.$local.fetch('xhtapelogin');
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
          "sysver": Vue.prototype.$local.fetch('xhsysver').sysver,
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
          console.log(res.data.data)
          console.log('再次请求余额');
          if(res.data.status ==1){
            context.commit('userdata', res.data.data)
            // this.userdata =res.data.data;
          }else {
            // 账户 异地登录

          }
        })
        .catch((err)=>{
          console.log(err)
        });
    },
  }

})

export default store



