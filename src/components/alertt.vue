<template>
  <div class="alert-bg" >
    <div class="alert-box">
      <p class="alert-info">{{message.title}}</p>
      <span class="alert-no" v-if="istwo" @click="nofn">{{message.no}}</span>
      <span :class="{alertYes:true ,oneclas:!istwo}" @click="yesfn">{{message.yes}}</span>
    </div>
  </div>
</template>

<script>

//  function twoalert(id,) {
//
//  }
    export default {
        name: '',
        props:['message','istwo'],
        data () {
            return {
                msg: ''
            }
        },
      methods:{
        nofn(){
          this.$emit('alertno')
        },
        yesfn(){
          this.$emit('alertyes')
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert-bg{ display: -webkit-box; width:100%; height:100vh; position: fixed; top: 0; left: 0; -webkit-box-pack:center; -webkit-box-align:center; background:rgba(0,0,0,0.2);z-index: 668;overflow: hidden;}
.alert-box{background: #fff; width: 90%; border-radius: 4px; text-align: center;box-sizing: border-box; }
.alertYes, .alert-no{display:block; width: 50%;height: 1rem; line-height: 1rem;box-sizing: border-box;float: left;font-size: 0.4rem; }
.alert-info{padding: 0.5rem;border-bottom: 1px solid #eee; font-size:0.4rem;}
.alert-no{border-right:1px solid #eee;}
.alertYes{color:#cc0000;}
.alertYes.oneclas{width: 100%;height: 1rem; line-height: 1rem;box-sizing: border-box;font-size: 0.4rem;}
</style>
