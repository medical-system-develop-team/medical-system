<template>
  <div id="departcheck">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>部门管理</el-breadcrumb-item>
        <el-breadcrumb-item>部门操作</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :inline="true" :model="depart" class="demo-form-inline">
      <el-form-item label="部门编号">
        <el-input v-model="depart.id" size='mini' placeholder="请输入部门编号"></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="depart.name" size='mini' placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size='mini' @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table
        :data="departData"
        stripe
        style="width: 100%">
        <el-table-column
          label="部门编号"
          align="center"
          width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门名称"
          align="center"
          width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.departname}}</span>
          </template>
        </el-table-column>
      
        <el-table-column
          label="部门人数"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="曾用名"
          align="center"
          width="280">
          <template slot-scope="scope">
            <span>{{ scope.row.oldname}}</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="userData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          label="编号"
          align="center"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.depart}}</span>
          </template>
        </el-table-column>
                <el-table-column
          label="年龄"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.age}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.sex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="民族"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.nation}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="工资号"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.salaryid}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          align="center"
          width="280">
          <template slot-scope="scope">
            <span>{{ scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.role}}</span>
          </template>
        </el-table-column>
      </el-table>
      <DepartEdit :dialogEdit="dialogEdit" :form="form" @updateEdit="getDepartInfo"></DepartEdit>
    </template>
  </div>

</template>
<script>
  import { checkdepart } from '@/api/index.js'
  import DepartEdit from './DepartEdit.vue'

  export default {
    name:'departcheck',
    components:{   
      DepartEdit
    },
    data() {
      return {
        dialogEdit : {   //编辑弹出框，默认是false
          show : false
        },
        form:{    //编辑信息
          id:'',
          departname:'',
          number:'',
          oldname:''
        },
        depart: {
          id: '',
          name: ''
        },
        departData:[{
          id:'1231231',
          departname:'1312313',
          number:'13',
          oldname:'131',
        }],
        userData:[{
          id:'131231231',
          username:'1231313',
          depart:'13123123',
          age:'',
          sex:'',
          nation:'',
          phone:'',
          salaryid:'',
          address:'',
          role:'12313123'
        }]
      }
    },
    created(){
            //this.onSubmit();
        },
    methods: {
      onSubmit(){
        //this.$refs.form.validate( valid => {
         // if (!valid) return
          console.log("depart",this.depart);
          checkdepart(this.depart).then(res=> {
              console.log('部门信息',res);
              this.departData = res.departdata;
              this.userData = res.usertdata;
          }
          )
       // })
      //console.log('submit!');
      },

      getDepartInfo() {
        this.$axios.get('http://localhost:3000/data').then(res => {
          this.departData = res.data  
          //this.userData.push(formDate);
        })
      },

      handleEdit(index,row){  //编辑
        this.dialogEdit.show = true ;  //显示弹
        
        this.form = {
          id:row.id,
          departname:row.departname,
          number:row.number,
          oldname:row.oldname
        }
        console.log('deartedit')
      },
      handleDelete(index, row) {
        console.log(index, row);
        //this.$router.push('/Admin/usermanage/userdelet')
         // 删除用户信息
        this.$axios.delete(`http://localhost:3000/data/${row.id}`).then(res =>{
            this.$message({
                res,
                type:"success",
                message:"删除信息成功"
            })
        })
      }
    }
  }
</script>

<style lang = "less" scoped>

</style>