<template>
  <div class="login-views">
    <div class="login-form-container">
      <p class="form-title">(公费)医疗自助报销系统</p>
      <el-form ref="form" :model="loginForm" :rules="rules">
        <el-form-item class="form-input" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item class="form-input" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item class="form-button">
          <el-button type="primary" @click="onLogin"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { serviceLogin } from '@/api/index.js'

export default {
  name: 'Login',
  components: {},
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!(/^[0-9a-zA-Z]*$/g.test(value))) callback(Error('密码只能输入字母、数字'))
      callback()
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'change' },
          { validator: validatePassword, trigger: 'change' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onLogin() {
      this.$refs.form.validate( valid => {
        if (!valid) return
        serviceLogin(this.loginForm).then(
          response => {
            console.log('Login 接口返回数据为：', response)
            if (response.code === 400) {
              this.$message.error(response.code || '用户不存在')
              return
            }
            if (response.code === 300) {
              this.$message.error(response.code || '用户名或密码错误')
              return
            }
            if (response.code === 600) {
              this.$message.error(response.code || '系统错误')
              return
            }
            if (response.code === 200) { //学生用户
              this.$message.success('登录成功')
              //sessionStorage.setItem('loginStatus', true)
              this.$router.push('/stdhome')
            }
            else if (response.code === 201) {  //管理员
              this.$message.success('登录成功')
              //sessionStorage.setItem('loginStatus', true)
              this.$router.push('/Admin')
            }
            else if (response.code === 202) {   //审核负责人
              this.$message.success('登录成功')
              //sessionStorage.setItem('loginStatus', true)
              this.$router.push('/checker')
            }
            else if (response.code === 203) {   //审核负责人
              this.$message.success('登录成功')
              //sessionStorage.setItem('loginStatus', true)
              this.$router.push('/checkerAdmin')
            }
            else if (response.code === 204) {   //审核负责人
              this.$message.success('登录成功')
              //sessionStorage.setItem('loginStatus', true)
              this.$router.push('/shoudanyuan')
            }
        
         }
        )
      })
    }
  }
}
</script>

<style lang="less">
@containerPadding: 40px;
@mainColor: #409eff;

.login-views {
  display: flex;
  flex-direction: row;
  .form-title {
    font-size: 20px;
    margin-top: 0px;
    text-align: left;
    border-left: 4px solid @mainColor;
    padding-left: 10px;
    margin-bottom: 40px;
  }
  .form-input {
    margin-bottom: -1px;
    input {
      border-radius: 4px 4px 0 0;
    }
  }
  .form-input + .form-input {
    input {
      border-radius: 0 0 4px 4px;
    }
  }
  .form-button {
    position: absolute;
    bottom: 20px;
    left: @containerPadding;
    right: @containerPadding;
    button {
      margin-top: 20px;
      width: 100%;
    }
  }
}
.login-form-container {
  position: relative;
  margin: auto;
  width: 20vw;
  min-width: 400px;
  height: 33vh;
  min-height: 300px;
  margin-top: 25vh;
  border-radius: 5px;
  padding: @containerPadding;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
