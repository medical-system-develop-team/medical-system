<template>
  <div class="UserEdit">
    <el-dialog title="编辑用户信息" :visible.sync="dialogEdit.show">
      <el-form :model="form" ref="formEdit" label-width="100px" :rules="formrules">
        <el-form-item label="用户号" prop="userid">
          <el-input v-model="form.userid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="depart">
          <el-input v-model="form.depart"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="form.nation"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="工资号" prop="salaryid">
          <el-input v-model="form.salaryid"></el-input>
        </el-form-item> -->
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="form.role"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormEdit('formEdit')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import { axiospost } from '@/api/index.js'
  export default {
    name: 'UserEdit',
    props:{
      dialogEdit:Object,
      form:Object,
      indexNum:Object
    },
    data () {
      return {
        /* form:{
          id:'',
          username:'',
          depart:'',
          age:'',
          sex:'',
          nation:'',
          phone:'',
          salaryid:'',
          address:'',
          role:''
        }, */
        formrules:{
          userid:[{required:true,message:"编号不能为空",trigger:"blur"}],
          username:[{required:true,message:"用户名不能为空",trigger:"blur"}],
          depart:[{required:true,message:"部门不能为空",trigger:"blur"}],
          role:[{required:true,message:"角色不能为空",trigger:"blur"}],
        }
      }
    },
    mounted(){ 
      //this.form = this.form; 
    },
    methods:{
      dialogFormEdit(formEdit) {
        this.$refs[formEdit].validate((valid) => {
          if (valid) {
            this.$emit('updateEdit',this.form);
            this.$message.success('修改信息成功')
            axiospost(`/useredit`,this.form).then(res => {
              console.log('发送数据：',this.form)
              console.log('接收数据：',res)
              if(res.code==200){
                this.$message.success('修改信息成功')
                this.dialogAdd.show = false;
                this.$emit('updateEdit',this.form);//更新父组件数据视图
              }else{
                this.$message.error(res.code || '修改失败！')
              }  
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>