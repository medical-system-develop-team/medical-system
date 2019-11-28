<template>
  <div class="recordmanage">
    <div>
      <Admin />
    </div>
   <el-container style="height: 100vh; border: 1px solid #eee" >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="1" @select="handleSelect" >
          <el-menu-item index="1">报销记录查询</el-menu-item>
          <el-menu-item index="2">报销记录归档</el-menu-item>
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
    name: 'recordmanage',
    components: {
      Admin
    },
    methods: {
      handleSelect(key){
        switch(key){
          case '1':
            this.$router.push('/Admin/recordmanage/recordcheck')
            break;
          case '2':
            this.$router.push('/Admin/departmanage/recordfiled')
            break;
        }
      },
    }
  }
</script>