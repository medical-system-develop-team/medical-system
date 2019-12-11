<template>
  <div class="hello">
    <el-dialog title="添加用户信息" :visible.sync="dialogAdd.show">
      <el-form :model="formDate" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="用户号" prop="userid">
          <el-input v-model="formDate.userid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formDate.username"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="depart">
          <el-input v-model="formDate.depart"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="formDate.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="formDate.sex"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="formDate.nation"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formDate.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="工资号" prop="salaryid">
          <el-input v-model="formDate.userid"></el-input>
        </el-form-item> -->
        <el-form-item label="地址" prop="address">
          <el-input v-model="formDate.address"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="formDate.role"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formdong')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import { axiospost } from '@/api/index.js'
  export default {
    name: 'AddUser',
    props:{
      dialogAdd:Object
    },
    data () {
      return {
        formDate:{
          userid:'',
          username:'',
          depart:'',
          age:'',
          sex:'',
          nation:'',
          phone:'',
          address:'',
          role:''
        },
        formrules:{
          userid:[{required:true,message:"用户号不能为空",trigger:"blur"}],
          username:[{required:true,message:"用户名不能为空",trigger:"blur"}],
          depart:[{required:true,message:"部门不能为空",trigger:"blur"}],
          role:[{required:true,message:"角色不能为空",trigger:"blur"}],
        }
      }
    },
    methods:{
      dialogFormAdd(formdong) {
        this.$refs[formdong].validate((valid) => {
          if (valid) {
            this.$emit('update',this.formDate);
            this.formDate  = {}
            axiospost('/useradd',this.formDate).then(res => {
                console.log('发送数据：',this.formDate)
                console.log('接收数据：',res)
                if(res.code==200){
                  this.$message.success('添加信息成功')
                  this.formDate  = {}
                  this.dialogAdd.show = false;
                  this.$emit('update',this.formDate);
                }else{
                  this.$message.error(res.code || '添加失败！')
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