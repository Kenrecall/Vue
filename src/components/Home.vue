<template>
  <div class="">
    <router-view></router-view>
    <ul class="ta_tab">
      <router-link :to="{path:'/phone',query:{sysver:sysver}}" tag="li" exact event="touchstart" replace>
        <img :src="imgurl.img1" alt="">
        <!--<span>通话</span>-->
      </router-link>
      <router-link :to="{path:'/tape',query:{sysver:sysver}}" tag="li" exact event="touchstart" replace>
        <img :src="imgurl.img2" alt="">
        <!--<span>我的录音</span>-->
      </router-link>
      <router-link :to="{path:'/my',query:{sysver:sysver}}" tag="li" exact event="touchstart" replace>
        <img :src="imgurl.img3" alt="">
        <!--<span>用户中心</span>-->
      </router-link>
    </ul>
  </div>
</template>

<script>
  import p11 from '../assets/img/p11.png'
  import p22 from '../assets/img/p22.png'
  import t11 from '../assets/img/t11.png'
  import t22 from '../assets/img/t22.png'
  import m11 from '../assets/img/m22.png'
  import m22 from '../assets/img/m11.png'
export default {
  name: 'hello',
  data () {
    return {
      msg: '',
    }
  },
  computed:{
    imgurl(){
      let  index =this.$route.meta.index;
      let img={
        img1:p11,
        img2:t22,
        img3:m11
      };
      if(index ==2){
        img.img1 = p22;
        img.img2 = t11;
        img.img3 = m11;
      }else if(index ==3){
        img.img1 = p22;
        img.img2 = t22;
        img.img3 = m22;
      }

      return img
    },
    sysver(){
        console.log(this.$local.fetch('xhsysver'))
        return  this.$local.fetch('xhsysver').sysver
    }
  },
  creatd(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ta_tab {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1.5rem;
  font-size: 0.4rem;
  text-align: center;
  width:100%;
  color:#929292;
  background:#f5f6f7;
}

.ta_tab li{
  float: left;
  width: 33.33%;
  height:1.4rem;
}
.ta_tab li img{
  display: block;
  width:0.8rem;
  height:0.8rem;
  margin: 0.3rem auto;

}
.ta_tab li span{
  line-height:0.7rem;
}
</style>
