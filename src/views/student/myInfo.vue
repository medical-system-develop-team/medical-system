<template>
  <div class="myInfo">
    <navmenu />
    <h1>修改个人信息</h1>
    <el-form class = "infoForm" ref="form" :model="myInfoForm" label-width="80px">
      <el-form-item label="工资号">
        <el-input v-model="myInfoForm.number"></el-input>
      </el-form-item>
      <el-form-item label="姓    名">
         <el-input v-model="myInfoForm.name"></el-input>
      </el-form-item>  
      <el-form-item label="性    别">
        <el-select v-model="myInfoForm.sex" placeholder="请选择性别">
          <el-option label="男" value="man"></el-option>
          <el-option label="女" value="woman"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民    族">
         <el-input v-model="myInfoForm.nation"></el-input>
      </el-form-item>  
      <el-form-item label="身份证号">
         <el-input v-model="myInfoForm.idcard"></el-input>
      </el-form-item>  
      <el-form-item label="联系电话">
         <el-input v-model="myInfoForm.phone"></el-input>
      </el-form-item>  
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
  </el-form>

  </div>
</template>

<script>
// @ is an alias to /src
import navmenu from '@/components/student/navmenu.vue'
import { serviceMyInfoSubmit } from '@/api/index.js'

export default {
    name: 'myInfo',
    components: {
      navmenu
    },
    data() {
      return {
        myInfoForm: {
          number: '',
          name: '',
          sex: '',
          nation: '',
          idcard: '',
          phone: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate( valid => {
          if (!valid) return
          serviceMyInfoSubmit(this.myInfoForm).then(
            response => {
              //console.log('Login 接口返回数据为：', response)
              if (response.msg == "fail") {
                this.$message.error(response.msg || '修改信息失败')
                return
              }
              if (response.msg === 'success') {
                this.$message.success('登录成功')
                sessionStorage.setItem('loginStatus', true)
                this.$router.push('/stdhome')
              }
          }
          )
        })
      }
    }
  }
</script>

<style>
.infoForm {
  width: 600px;
  margin:auto;
}
</style>