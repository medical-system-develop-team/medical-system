<template>
  <div class="DepartEdit">
    <el-dialog title="编辑部门信息" :visible.sync="dialogEdit.show">
      <el-form :model="form" ref="formEdit" label-width="100px" :rules="formrules">
        <el-form-item label="部门编号" prop="id">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="departname">
          <el-input v-model="form.departname"></el-input>
        </el-form-item>
        <el-form-item label="部门人数" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="部门曾用名" prop="oldname">
          <el-input v-model="form.oldname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DepartEdit',
  props:{
    dialogEdit:Object,
    form:Object
  },
  data () {
    return {
      formrules:{
        id:[{required:true,message:"部门编号不能为空",trigger:"blur"}],
        departname:[{required:true,message:"部门名称不能为空",trigger:"blur"}],
      }
    }
  },
  methods:{
    dialogFormEdit(formEdit) {
      this.$refs[formEdit].validate((valid) => {
        if (valid) {
          this.$axios.put(`http://localhost:3000/data/${this.form.id}`,this.form).then(res => {
            this.$message({
              type:"success",
              message:"编辑信息成功"
            })
            console.log(res)
              this.dialogEdit.show = false;
              this.$emit('updateEdit')   //更新父组件数据视图
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