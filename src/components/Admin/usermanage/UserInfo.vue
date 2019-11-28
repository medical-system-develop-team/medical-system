<template>
  <div class="hello">
    <el-dialog title="添加用户信息" :visible.sync="dialogAdd.show">
      <el-form :model="formDate" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="编号" prop="id">
          <el-input v-model="formDate.id"></el-input>
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
        <el-form-item label="工资号" prop="salaryid">
          <el-input v-model="formDate.salaryid"></el-input>
        </el-form-item>
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
export default {
  name: 'AddUser',
  props:{
    dialogAdd:Object
  },
  data () {
    return {
      formDate:{
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
      },
      formrules:{
        id:[{required:true,message:"编号不能为空",trigger:"blur"}],
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
            this.$axios.post('http://localhost:3000/data',this.formDate).then(res => {
                console.log('adasdasda',res)
                this.$message({
                    type:"success",
                    message:"添加信息成功"
                })
                console.log(res)
                this.dialogAdd.show = false;
                this.$emit('update',this.formDate);   
 
           })
            this.formDate  = ""
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    }
  }
}
</script>