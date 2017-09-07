<template>
  <div class="tape">
      <div class="ontape" v-if="istape">
        <img src="../../assets/img/img_zwth.png" alt="">
      </div>
    <ul class="tapem">
      <li v-for="(item ,index) in tapedata">
        <img src="../../assets/img/smphone.png" alt="" class="taimg1">
        <p>拨打 {{item.callee }} 的录音</p>
        <p>时长：{{item.real_call_minute}}</p>
        <p>{{item.create_time | timefilter }}</p>
        <div class="isintape" v-if="item.voice_record_status==0">处理中</div>
        <img src="../../assets/img/more.png" alt="" class="taimg2" v-if="item.voice_record_status==1" @click="gotdetali(item,index)">
      </li>
    </ul>
  </div>
</template>

<script>
  import HTTP from '../../until/http'
  import {timefn} from '../../until/toolfn'
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
        this.$router.push({path:'/tapede',query:{id:index}})
      }
    },
    computed:{
      tapedata(){
        let  da = this.$store.state.dedata;
        if(da && da.length == 0){
          this.istape = true
        }else {
          this.istape = false;
        }

        return  da;
      }
    },
    created(){
        this.$store.dispatch('getdatas',{page:1})
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
  height: 100vh;
  width: 100%;
  background:#f1f1f1;
}
.ontape img{
  width: 6rem;
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
