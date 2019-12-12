<template>
  <div id = "user"> 
    <div class="grid-content bg-purple-dark">
      公 费 医 疗 报 销 审 核 管 理 员 系 统
      <span style="float:right;padding-top:10px;margin-right:1%">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="color:black">
            欢迎{{admin}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item></el-dropdown-item>
            <el-dropdown-item></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>  
    <el-container style="height: 100vh; solid #eee" >
      <el-aside width="200px" style="background-color: #545c64">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo" 
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1"><i class="el-icon-s-grid"></i>待审核列表</el-menu-item>
          <el-menu-item index="2"><i class="el-icon-s-grid"></i>已审核列表</el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-user-solid"></i>修改个人信息</template>
              <!-- <el-menu-item index="3-1">基础信息修改</el-menu-item> -->
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
      return {admin:''}
    },
    components:{},
    created(){
      this.admin=this.$cookieStore.getCookie( 'username')
      this.$router.push({path: '/checkerAdmin/recording'})
    },
    methods: {
      handleSelect(key){
        switch(key){
          case '1':
            this.$router.push({path: '/checkerAdmin/recording', query:{id:'1'}})
            break;
          case '2':
            this.$router.push({path: '/checkerAdmin/completecheck'}) 
            break;
          case '3-1':
            this.$router.push({path: '/checkerAdmin/myInfo'}) 
            break;  
          case '3-2':
            this.$router.push({path: '/checkerAdmin/checkerAdminpassword'}) 
            break;  
          case '4':
            this.quit()
            //this.$router.push({path: '/'}) 
            break; 
        }
      },
     quit(){
        this.$confirm('确认退出?', '提示', {
            type: 'warning'
        })
        .then(() => {
          this.$cookieStore.delCookie('username')
          this.$cookieStore.delCookie('password')
          this.$router.push({path: '/'}) 
        })
        .catch(() => {})
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