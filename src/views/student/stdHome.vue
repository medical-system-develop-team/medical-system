<template>
 <div class="stdhome">
    <navmenu />
    <h1>欢迎进入公费医疗自助报销系统</h1>
    <el-button type="primary" round @click="next">开始录入报销凭证</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import navmenu from '@/components/student/navmenu.vue'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'stdhome',
  components: {
    navmenu
  },
  methods:{
    next() {
      this.$router.push('/uploadVoucher')
    },
  }
}
</script>

<style>
  
</style>
