<template>
  <div class="myInfo">
    <navmenu />
    <h1>修改个人信息</h1>
    <el-form class = "infoForm" ref="form" :model="myInfoForm" label-width="80px">
      <el-form-item label="工资号">
        <el-input v-model="myInfoForm.number" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓    名">
         <el-input v-model="myInfoForm.name"></el-input>
      </el-form-item>  
      <el-form-item label="性    别" style="text-align: left;">
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
      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
  </el-form>

  </div>
</template>

<script>
// @ is an alias to /src
import navmenu from '@/components/student/navmenu.vue'
import { serviceMyInfoSubmit } from '@/api/index.js'
import { getUserInfo } from '@/api/index.js'

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
    created(){
      this.getInfo()
    },
    methods: {
      getInfo(){
        getUserInfo().then(
            response => {
              this.myInfoForm.number = response.number
              this.myInfoForm.name = response.name
              this.myInfoForm.sex = response.sex
              this.myInfoForm.nation = response.nation
              this.myInfoForm.idcard = response.idcard
              this.myInfoForm.phone = response.phone
            })
      },
      onSubmit() {
        this.$refs.form.validate( valid => {
          if (!valid) return
          serviceMyInfoSubmit(this.myInfoForm).then(
            response => {
              if (response.code === 1) {
                console.log(this.myInfoForm)
                this.$message.success('修改成功')
                this.$router.push('/stdhome')
                this.getInfo()
              }
              else if (response.code === 401) {
                console.log(this.myInfoForm)
                this.$message.success('修改失败，数据不能为空')
              }
              else if (response.code === 402) {
                console.log(this.myInfoForm)
                this.$message.success('修改失败，身份证信息错误')
              }
              else{
                console.log(this.myInfoForm)
                this.$message.success('修改失败，电话号码格式错误')
              }
            }
          )
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.myInfo{
  .infoForm {
  width: 600px;
  padding: 50px 60px 20px 10px;
  margin: auto;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  // text-align: left;
  float: center;
  }
}
</style>