<template>
    <div class="set">
      <Goback title="设置"></Goback>
      <div class="myset" @click="setpsw">
        <span>修改密码</span>
        <img src="../../assets/img/more.png" alt="">
      </div>
      <div class="mysetout" @click="setout">
        <span>退出登录</span>
      </div>
    </div>
</template>

<script>
  import Goback from '@/goback'
    export default {
        name: '',
        data () {
            return {
                msg: ''
            }
        },
      components:{
        Goback
      },
      computed:{
        sysver(){
          return  this.$local.fetch('xhsysver').sysver
        }
      },
      methods:{
        setpsw(){
          this.$router.push({path:'/reg',query:{title:3,sysver:this.sysver}})
        },
        setout(){
          this.$local.save('xhtapelogin','')
          this.$router.replace({path:'/phone',query:{sysver:this.sysver}})

        }
      },
      created(){
          let islogin =  this.$local.fetch('xhtapelogin').mobile;
          if(!islogin){
              this.$router.replace({path:'/login',query:{key:'phone',sysver:this.sysver}})
          }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .set{
  }
  .myset {
    width: 100%;
    height: 1.3rem;
    background: #fff;
    line-height: 1.3rem;
    padding-left: 0.6rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e2e2e2;
    border-top: 1px solid #e2e2e2;
    font-size: 0.43rem;
    text-align: left;
    position: relative;
  }
  .myset img{
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    top:0rem;
    right: 0.1rem;
    padding:0.3rem 0.3rem;

  }
.mysetout{
  width: 100%;
  height: 1.4rem;
  background: #fff;
  line-height: 1.4rem;
  box-sizing: border-box;
  position: fixed;
  bottom:3rem;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  font-size: 0.43rem;
  color: #0069ff;

}

</style>
