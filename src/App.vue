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
      let key = urlarr[urlarr.length-1];
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
