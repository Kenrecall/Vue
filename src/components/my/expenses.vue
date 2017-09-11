<template>
  <div class="myexp">
    <ul  v-if="istape">
      <li class="myexpli" v-for="item in lists">
        <p><span>呼叫号码：{{item.callee}}</span><span>{{ item.cost_money}}元</span></p>
        <p><span>{{ item.create_time | timefilter }}</span><span>通话时长：{{item.real_call_minute}}</span></p>
      </li>
    </ul>
    <p v-if="!istape" class="expen_p">暂无历史账单~~</p>
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
        istape:false
      }
  },
    methods:{

    },
    filters:{ // 过滤器
      timefilter:function(value){
        return timefn(new Date( Number(value+'000')))
      }
    },
    computed:{
      lists(){
        let  da = this.$store.state.dedata;
        if(da && da.length != 0){
          this.istape = true
        }else {
          this.istape = false;
        }
        return  da;
      }
    },
    created(){
      let  da = this.$store.state.dedata;
      if(!da){
        this.$store.dispatch('getdatas',{page:1})
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .myexp{
    padding-top: 0.4rem;
  }
  .myexp ul{
    border-top: 1px  solid #dedede;
    background: #ffffff;
  }
  .myexpli{
    height: 1.6rem;
    font-size: 0.4rem;
    border-bottom: 1px  solid #dedede;
    padding: 0.15rem 0;
  }
  .myexpli p{
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    text-align: left;
  }
  .myexpli p:nth-of-type(1){
    font-family:PingFangSC-Regular;
    font-size:16px;
    color:#333333;
    height: 1rem;
    line-height: 1rem;
  }
  .myexpli p:nth-of-type(1) span:nth-of-type(2){
    float: right;
    font-family:PingFangSC-Regular;
    font-size:20px;
    color:#e69c0e;
  }
  .myexpli p:nth-of-type(2){
    font-family:PingFangSC-Regular;
    font-size:13px;
    color:#666666;
    height: 0.6rem;
    line-height: 0.6rem;
  }
  .myexpli p:nth-of-type(2) span:nth-of-type(2){
    float: right;
    font-size:13px;
    color:#666666;
  }
.expen_p{
  font-size: 0.35rem;
  line-height: 3rem;
}
</style>
