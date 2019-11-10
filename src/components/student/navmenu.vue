<template>
  <div class="nav-menu">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="onSelectMenu" active-text-color="#409EFF">
      <el-menu-item v-for="(menu, index) in menus" :class="menu.class || ''" :key="index" :index="index.toString()">
        <i :class="menu.icon || ''"></i> {{ menu.label }}
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
        { label: '首页', path: '/stdhome', class: 'main-menu', icon:'el-icon-s-home'},

        { label: '退出系统', path: '/login', class: 'right-menu' },
        { label: '我的个人信息', path: '/myInfo', class: 'right-menu'  },
        { label: '我的报销记录', path: '/myRecords', class: 'right-menu'  },
        { label: '录入报销凭证', path: '/uploadVoucher', class: 'right-menu' }
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
.main-menu {
  font-size: 20px
}
.right-menu {
  float: right;
}
.right-menu + .right-menu {
  margin-left: 15px;
}
</style>
