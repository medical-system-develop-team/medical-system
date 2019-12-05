<template>
  <div id = "user"> 
    <div class="grid-content bg-purple-dark">
      公 费 医 疗 报 销 审 核 员 系 统
      <span style="float:right;padding-top:10px;margin-right:1%">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="color:black">
            admin<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>  
      
    <el-container style="height: 100vh;  solid #eee" >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu 
          default-active="1-1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-upload2"></i>待审核列表</template> 
              <el-menu-item index="1-1">待审核学生列表</el-menu-item>
              <el-menu-item index="1-2">待审核职工列表</el-menu-item>
              <el-menu-item index="1-3">待审核退休列表</el-menu-item>
              <el-menu-item index="1-4">待审核离休列表</el-menu-item>
              <el-menu-item index="1-5">待审核医照列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="2"><i class="el-icon-s-grid"></i>已审核列表</el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-user-solid"></i>修改个人信息</template>
              <el-menu-item index="3-1">基础信息修改</el-menu-item>
              <el-menu-item index="3-2">个人密码修改</el-menu-item>
          </el-submenu>
          <el-menu-item index="4"><i class="el-icon-delete"></i>退出报销系统</el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-main>        
        <router-view></router-view>       
      </el-main>
    </el-container>   
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleSelect(key){
        switch(key){
          case '1-1':
            this.$router.push({path: '/checker/recording', query:{id:'1'}})
            break;
          case '1-2':
            this.$router.push({path: '/checker/recording', query:{id:'2'}})
            break;
          case '1-3':
            this.$router.push({path: '/checker/recording', query:{id:'3'}})
            break;
          case '1-4':
            this.$router.push({path: '/checker/recording', query:{id:'4'}})
            break;
          case '1-5':
            this.$router.replace({path: '/checker/recording', query:{id:'5'}}) 
            break;
          case '2':
            this.$router.push({path: '/checker/completecheck'}) 
            break;
          case '3-2':
            this.$router.push({path: '/checker/checkerpassword'}) 
            break;  
          case '4':
            this.$router.push({path: '/'}) 
            break; 
        }
      },
    }
  }
</script>
<style>
 .bg-purple-dark {
    background: #07c4a8;
  }
  .grid-content {
    min-height: 54px;
    line-height:54px; 
    font-family:"楷体";
    text-align:center;
    font-size: 33px;
    
  }
</style>