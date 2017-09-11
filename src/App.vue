<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    console.log(this.$route.redirectedFrom)
    let keys =this.$route.redirectedFrom;
    if(keys){
      let urlarr = this.$route.redirectedFrom.split('=');
      console.log(urlarr);
      let key = urlarr[urlarr.length-1];
      let sysver='';
      if(urlarr.length>2){
        sysver =urlarr[1].split('&')[0]
      }else {
        sysver = key;
      }
      this.$local.save('xhsysver',sysver);
      console.log(sysver)
      console.log(key)
      if(key){
        this.$router.push('/'+key)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
