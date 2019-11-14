<template>
  <div class="nav-menu">
    <el-menu ref="menu" :default-active.sync="activeIndex" mode="horizontal" active-text-color="#409EFF">
      <el-menu-item v-for="(menu, index) in menus" :class="menu.class || ''" :key="menu.key" :index="index.toString()" @click="onSelectMenu(index, menu.key)">
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
      preActiveIndex: '0',
      menus: [
        { label: '首页', key: 'home', path: '/stdhome', class: 'main-menu', icon: 'el-icon-s-home' },
        { label: '退出系统', key: 'logout', path: '/login', class: 'right-menu' },
        { label: '我的个人信息', key: 'personInfo', path: '/myInfo', class: 'right-menu' },
        { label: '我的报销记录', key: 'records', path: '/myRecords', class: 'right-menu' },
        { label: '录入报销凭证', key: 'inVoucher', path: '/uploadVoucher', class: 'right-menu' }
      ]
    }
  },
  created() {
    for (let i = 0; i < this.menus.length; i++) {
      if (this.$route.path === this.menus[i].path) {
        this.activeIndex = i.toString()
        break
      }
    }
  },
  mounted() { this.preActiveIndex = this.$refs['menu'].activeIndex },
  methods: {
    onSelectMenu(index, key) {
      if (key === 'logout') {
        this.$confirm('确认退出？').then(() => {
          this.goto(this.menus[index].path)
          this.preActiveIndex = this.$refs['menu'].activeIndex
        }).catch(() => {
          this.$refs['menu'].activeIndex = this.preActiveIndex
        })
      } else {
        this.goto(this.menus[index].path)
        this.preActiveIndex = this.$refs['menu'].activeIndex
      }
    },
    goto(path) {
      if (this.$route.path === path) return // 不能向当前页面路径再次跳转
      else this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.main-menu {
  font-size: 20px;
}
.right-menu {
  float: right;
}
.right-menu + .right-menu {
  margin-left: 15px;
}
</style>
