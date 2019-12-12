<template>
  <div class="hello">
    <el-dialog title="添加部门信息" :visible.sync="dialogAdd.show">
      <el-form :model="formDate" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="部门编号" prop="id">
          <el-input v-model="formDate.id"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="departname">
          <el-input v-model="formDate.departname"></el-input>
        </el-form-item>
        <el-form-item label="部门人数" prop="number">
          <el-input v-model="formDate.number"></el-input>
        </el-form-item>
        <el-form-item label="部门曾用名" prop="oldname">
          <el-input v-model="formDate.oldname"></el-input>
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
  name: 'AddDepart',
  props:{
    dialogAdd:Object
  },
  data () {
    return {
      formDate:{
        id:'',
        departname:'',
        number:'',
        oldname:''
      },
      formrules:{
        id:[{required:true,message:"部门编号不能为空",trigger:"blur"}],
        departname:[{required:true,message:"部门名称不能为空",trigger:"blur"}],
      }
    }
  },
  methods:{
    dialogFormAdd(formdong) {
      this.$refs[formdong].validate((valid) => {
        if (valid) {
          //this.$emit('update',this.formDate);
          this.formDate  = {}
          axiospost('/departadd',this.formDate).then(res => {
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