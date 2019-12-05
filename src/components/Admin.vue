<template>
  <div class="Admin">
    <el-menu 
      :default-active="activeIndex" 
      mode="horizontal"
      @select="onSelectMenu" 
      background-color="#DCDCDC" 
      text-color="#696969" 
      active-text-color="#CD853F">
      <el-menu-item v-for="(menu, index) in menus" :class="menu.class || ''" :key="index" :index="index.toString()">
        {{ menu.label }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  components: {},
  data() {
    return {
      activeIndex: '0',
      menus: [
        { label: '用户管理', path: '/Admin/usermanage' },
        { label: '部门管理', path: '/Admin/departmanage' },
        { label: '报销记录管理', path: '/Admin/recordmanage' },
        { label: '退出系统', path: '/', class: 'right-menu' }
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