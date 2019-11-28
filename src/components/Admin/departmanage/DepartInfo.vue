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