<template>
    <div class="problem">
      <Goback title="常见问题"></Goback>
      <ul class="myproblem">
        <li class="prot"  @click="protfn(0)">
          <span >通话录音打电话消耗流量吗？</span>
          <img src="../../assets/img/more.png" alt="" :class="{transf:currentindex== 0}">
        </li>
        <li class="prode"  @click="prodefn()" v-if="currentindex== 0">【通话录音】APP采用双向回拨方式通过终端经网络发起通话请求，再由云平台分别向双方手机或座机拨打电话，并由云平台桥接实现的通话方式。双向回拨成功后将主叫拨打电话变为接听电话，接通后通话不受网络影响，不消耗流量，整个拨打过程只在开始和结束阶段消耗1-5kb的流量。</li>
        <li class="prot"  @click="protfn(1)">
          <span>打电话消耗手机运营商费用吗？</span>
          <img src="../../assets/img/more.png" alt="" :class="{transf:currentindex== 1}">
        </li>
        <li class="prode"  @click="prodefn()" v-if="currentindex== 1">如果您的手机接听电话不收费用，则不会收取任何手机运营商电话费用，否则收取相应的接听电话费用（包括漫游等）。</li>
        <li class="prot"  @click="protfn(2)">
          <span>可不可以不绑定手机号码？</span>
          <img src="../../assets/img/more.png" alt="" :class="{transf:currentindex== 2}">
        </li>
        <li class="prode"  @click="prodefn()" v-if="currentindex== 2">不可以！【通话录音】采用的是双向回拨方式为你中转双方的电话，不绑定手机号码我们无法为你接通对方的电话，同时建议您将安装APP的手机号绑定到你的【通话录音】账户上。</li>
        <li class="prot"  @click="protfn(3)">
          <span>通话录音内容的安全性问题</span>
          <img src="../../assets/img/more.png" alt="" :class="{transf:currentindex== 3}">
        </li>
        <li class="prode"  @click="prodefn()" v-if="currentindex== 3">每位用户的通话录音文件均以加密的形式存储在阿里云服务器中，录音文件需要相应的动态秘钥进行解密方可正常播放，且解密秘钥有效时间为15分钟，保证了用户通话录音的隐私。</li>
      </ul>
    </div>
</template>

<script>
  import Goback from '@/goback'
    export default {
        name: '',
        data () {
            return {
              msg: '',
              currentindex:-1
            }
        },
        components:{
          Goback
        },
      methods:{
        protfn(index){
          if(this.currentindex == index){
            this.currentindex =-1
          }else {
            this.currentindex = index;
          }

        },
        prodefn(){
          this.currentindex =-1
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .problem{
    text-align: left;
  }
  .myproblem{
    margin-top: 0.4rem;
    font-size: 0.43rem;
  }
  .myproblem .prot{
    padding-left: 0.6rem;
    background: #fff;
    line-height: 1.2rem;
    height: 1.2rem;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 10px;
  }
  .myproblem .prot img{
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    top:0;
    right: 0.1rem;
    padding:0.3rem 0.3rem;
    transition:0.2s;

  }
  .myproblem .prot img.transf{
    transform:rotate(90deg)
  }
.prode{
  line-height: 0.5rem;
  font-size: 0.35rem;
  padding: 0.1rem 0.4rem 0.3rem;
}
</style>
