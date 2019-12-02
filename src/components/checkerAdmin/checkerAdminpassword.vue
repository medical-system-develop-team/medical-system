<template>
  <div id="userpassword">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码:" prop="oldPass">
        <el-input  v-model="ruleForm.oldPass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码:" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
      name:'userpassword',
    data() {
      var checkOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        }
        else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
         // oldPass: ''
        },
        rules: {
          /* oldPass: [
            { validator: checkOldPass, trigger: 'blur' }
          ], */
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang = "less" scoped>
#userpassword{
  width: 400px;
  margin: auto; 
  padding:20px;
}
</style>

