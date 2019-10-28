<template>
  <div class="navmenu">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="onSelectMenu">
      <el-menu-item v-for="(menu, index) in menus" :key="index" :index="index.toString()">
        {{ menu.label }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navmenu',
  components: {},
  data() {
    return {
      activeIndex: '0',
      menus: [
        { label: '首页', path: '/' },
        { label: '登录', path: '/login' }
      ]
    }
  },
  created() {
    for (let i = 0; i < this.menus.length; i++ ) {
      if (this.$route.path === this.menus[i].path) {
        this.activeIndex = i.toString()
        break
      }
    }
  },
  methods: {
    onSelectMenu(key) {
      this.$router.push(this.menus[key].path)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
