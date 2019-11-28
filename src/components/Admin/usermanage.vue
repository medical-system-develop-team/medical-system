<template>
  <div class="usermanage">
    <div>
      <Admin />
    </div>
    <el-container style="height: 100vh; border: 1px solid #eee" >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="1" @select="handleSelect" >
          <el-menu-item index="1">用户查询</el-menu-item>
          <el-menu-item index="2">添加用户</el-menu-item>
          <!-- <el-menu-item index="3">修改用户</el-menu-item>
          <el-menu-item index="4">删除用户</el-menu-item> -->
          <el-menu-item index="5">重置用户密码</el-menu-item>
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
    name: 'usermanage',
    components: {
      Admin
    },
    methods: {
      handleSelect(key){
        switch(key){
          case '1':
            this.$router.push('/Admin/usermanage/usercheck')
            break;
          case '2':
            this.$router.push('/Admin/usermanage/useradd')
            break;
          /* case '3':
            this.$router.push('/Admin/usermanage/useredit')
            break;
          case '4':
            this.$router.push('/Admin/usermanage/userdelet')
            break; */ 
          case '5':
            this.$router.push('/Admin/usermanage/userpassword')
          break;
        }
      },
    }
  }
</script>