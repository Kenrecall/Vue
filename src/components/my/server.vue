<template>
  <div class="server">
    <iframe src="https://liaoxingqiu.qiyukf.com/client?k=16a98dd922783c5096075b80360ce2ed&wp=1&gid=671057&robotShuntSwitch=0" frameborder="0" id="myiframe"></iframe>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                msg: ''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.server{
   width: 100%;
   height: 100vh;
}
#myiframe{
  width: 100%;
  height: 100%;
}

</style>
