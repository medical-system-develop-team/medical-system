<template>
  <div id="app">
    <!-- <el-container>
      <el-header>
        <navmenu />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container> -->
    <router-view />
  </div>
</template>

<script>
// import Navmenu from '@/components/student/navmenu.vue'

export default {
  name: 'App',
  components: { },
  // components: { Navmenu },
  data() {
    return {}
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 700px;
  max-width: 1000px;
  margin: 0 auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
