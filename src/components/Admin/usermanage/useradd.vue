<template>
  <div id="useradd">
    <el-row >
      <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="hanldeAdd()">添加用户</el-button>
      <el-button type="success" size="small" icon="el-icon-upload" @click="BatchIn()">批量导入</el-button>
    </el-row>
    <template>
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
      <el-pagination background layout="total"  :total="pageInfo.pageTotal">
      </el-pagination>
    </template>
    <UserInfo :dialogAdd="dialogAdd" @update="getUserInfo"></UserInfo>
    <UserEdit :dialogEdit="dialogEdit" :form="form" @updateEdit="getUserInfo"></UserEdit>
    <BatchIn :dialogBatchIn="dialogBatchIn" @updatebatchin="getUserInfo"></BatchIn>
  </div>
</template>
<script>

  //import { checkuser } from '@/api/index.js'
  import UserInfo from './UserInfo.vue'
  import UserEdit from './UserEdit.vue'
  import BatchIn from './BatchIn.vue'

  export default {
    name:'useradd',
    
    components:{   
      UserInfo,
      UserEdit,
      BatchIn
    },

    data() {
      return {
        dialogAdd : {
          show : false
        },
        dialogEdit : {   //编辑弹出框，默认是false
          show : false
        },
        dialogBatchIn:{
          show : false
        },
        pageInfo: { //分页
                pageTotal: 1
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
            this.getUserInfo();
        },
    methods: {
      hanldeAdd(){  
        this.dialogAdd.show = true ;    
      },
      BatchIn(){
        this.dialogBatchIn.show = true ; 
      },
      getUserInfo() {
        this.$axios.get('http://localhost:3000/data').then(res => {
          this.pageInfo.pageTotal=res.count;
          this.userData = res.data  
          //this.userData.push(formDate);
        })
      },
    
      handleDelete(index,row) {
        // 删除用户信息
        this.$axios.delete(`http://localhost:3000/data/${row.id}`).then(res =>{
            this.$message({
                res,
                type:"success",
                message:"删除信息成功"
            })
            this.getUserInfo()    //删除数据，更新视图
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
    }
  }
</script>

<style lang = "less" scoped>
</style>