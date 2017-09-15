<template>
  <div class="goback" v-if="false" @click="gobf">
    <img src="../assets/img/backbg_1.png" alt="">
    {{title}}
  </div>
</template>

<script>
    export default {
        name: '',
        props:['title'],
        data () {
            return {
                msg: ''
            }
        },
        computed:{
          isiphone(){
            return  this.$local.fetch('isiPhone')
          }
        },
        methods:{
          gobf(){
            this.$router.go(-1); // 返回上一页
          },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goback{
  height: 1.2rem;
  background: #fff;
  position: relative;
  font-size: 0.45rem;
  line-height: 1.2rem;
  text-align: center;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #e2e2e2;

}
.goback img{
  height: 0.7rem;
  width: 0.7rem;
  padding: 0.25rem 0.6rem 0.25rem 0.25rem;
  position: absolute;
  left:0;

}

</style>
