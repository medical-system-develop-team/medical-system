<template>
  <div class="stdhome">
    <navmenu />
    
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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
  }
}
</script>
