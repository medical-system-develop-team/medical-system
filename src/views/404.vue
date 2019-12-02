<template>
  <div class="not-found">
    <h1>404: NOT FOUND</h1>
    <el-button type="text">
      <router-link to="/">返回首页</router-link>
    </el-button>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style lang="less" scoped>
.not-found {
  text-align: left;
  margin-left: 10vw;
  margin-top: 20vh;
  h1 {
    font-size: 40px;
  }
  a {
    font-size: 18px;
    color: #409eff;
    text-decoration: none;
  }
  a:hover {
    color: #66b1ff;
    border-color: transparent;
    background-color: transparent;
  }
}
</style>
