<template>
  <div class="usercheck">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :inline="true" :model="user" class="demo-form-inline">
      <el-form-item label="用户号">
        <el-input v-model="user.id" size="mini" placeholder="请输入用户号"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.name" size="mini" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table_container">
      <el-table
        :data="userData"
        stripe
        style="width: 100%">
        
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
          label="姓别"
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
      <UserEdit :dialogEdit="dialogEdit" :form="form" @updateEdit="getUserInfo"></UserEdit>
    </div>
  </div>

</template>
<script>
  import { checkuser } from '@/api/index.js'
  import UserEdit from './UserEdit.vue'

  export default {
    name:'usercheck',
    components:{   
      UserEdit
    },
    data() {
      return {
        dialogEdit : {   //编辑弹出框，默认是false
          show : false
        },
        form:{    //编辑信息
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
        user: {
          id: '',
          name: ''
        },
        userData:[{
          id:'1231231',
          username:'1312313',
          depart:'13131',
          age:'',
          sex:'',
          nation:'',
          phone:'',
          salaryid:'',
          address:'',
          role:'131313'
        }]
      }
    },
    created(){
            //this.onSubmit();
        },
    computed:{},
    methods: {
      onSubmit(){
        //this.$refs.form.validate( valid => {
         // if (!valid) return
          console.log("asdad",this.user);
          checkuser(this.user).then(res=> {
              console.log('用户信息',res);
              this.userData = res.data;
          }
          )
       // })
      //console.log('submit!');
      },

      getUserInfo() {
        this.$axios.get('http://localhost:3000/data').then(res => {
          this.userData = res.data  
          //this.userData.push(formDate);
        })
      },

      handleEdit(index,row){  //编辑
        this.dialogEdit.show = true ;  //显示弹
        
        this.form = {
          id:row.id,
          username:row.username,
          depart:row.depart,
          age:row.age,
          sex:row.sex,
          nation:row.nation,
          phone:row.phone,
          salaryid:row.salaryid,
          address:row.address,
          role:row.role
        }
        console.log('adadad')
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
      },
      selectTable(val, row){
          this.setSearchBtn(val);
      },
      // 用户全选checkbox时触发该事件
      selectAll(val){
            val.forEach((item) => {
                this.rowIds.push(item.id);
          });
          this.setSearchBtn(val);
      },
      setSearchBtn(val){
          let isFlag = true;
          if(val.length > 0){
              isFlag = false;
          }else{
              isFlag = true;
          }
          this.$store.commit('SET_SEARCHBTN_DISABLED',isFlag);
      }
    }
  }
</script>

<style lang="less" scoped>
  .table_container{
      padding: 10px;
      background: #fff;
      border-radius: 2px;
  }
     
</style>