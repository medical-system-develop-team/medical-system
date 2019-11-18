<template>
  <div class="departmanage">
    <div>
      <Admin />
    </div>
    <el-container style="height: 100vh; border: 1px solid #eee" >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="1" @select="handleSelect" >
          <el-menu-item index="1">部门操作</el-menu-item>
          <el-menu-item index="2">添加部门</el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-main>        
        <router-view></router-view>       
      </el-main>

    </el-container>  
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
 import Admin from '@/components/Admin.vue'

  export default {
    name: 'departmanage',
    components: {
      Admin
  },
  methods: {
      handleSelect(key){
        switch(key){
          case '1':
            this.$router.push('/Admin/departmanage/departcheck')
            break;
          case '2':
            this.$router.push('/Admin/departmanage/departadd')
            break;
        }
      }
    }
  }
</script>