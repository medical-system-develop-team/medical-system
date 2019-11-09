<template>
  <div class="nav-menu">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="onSelectMenu">
      <el-menu-item v-for="(menu, index) in menus" :class="menu.class || ''" :key="index" :index="index.toString()">
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
        { label: '录入报销凭证', path: '/stdhome'},
        { label: '我的报销记录', path: '/myRecords' },
        { label: '我的个人信息', path: '/myInfo' },
        { label: '退出系统', path: '/login', class: 'right-menu' }
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
      console.log(key)
      this.$router.push(this.menus[key].path)
    }
  }
}
</script>

<style lang="less" scoped>
.right-menu {
  float: right;
}
.right-menu + .right-menu {
  margin-left: 20px;
}
</style>
