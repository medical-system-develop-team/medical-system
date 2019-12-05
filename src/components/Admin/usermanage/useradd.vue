<template>
  <div id="useradd">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <addItem :batchdelable="batchdelable" @adduser="hanldeAdd" @BatchIn="BatchIn" @BatchDel="BatchDel"></addItem>
    <!-- <el-row >
      <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="hanldeAdd()">添加用户</el-button>
      <el-button type="success" size="small" icon="el-icon-upload" @click="BatchIn()">批量导入</el-button>
    </el-row> -->
    <!-- <div class="search_container searchArea">
        <el-form 
            :inline="true" 
            class="demo-form-inline search-form">
            <el-form-item>
                <el-button type="primary" size ="mini" icon="search" @click='adduser()'>添加用户</el-button>
            </el-form-item>
            <el-form-item class="btnRight">
                <el-button type="success" size ="mini" icon="view" @click='BatchIn()'>批量导入</el-button>
                <el-button type="danger" size ="mini" icon="view" @click='BatchDel()' :disabled="batchdelable" >批量删除</el-button>
            </el-form-item>
        </el-form>
    </div> -->
    <template>
      <el-table
        :data="userData"
        stripe
        style="width: 100%"
        @select="handleSelectionChange"
        @select-all="selectAll">
        <el-table-column
          type="selection"
          align='center'
          width="60">
        </el-table-column>
        <el-table-column
          type="index"
          width="20">
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
      <el-pagination background layout="total"  :total="pageTotal">
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
  import addItem from './addItem.vue'

  export default {
    name:'useradd',
    
    components:{   
      UserInfo,
      UserEdit,
      BatchIn,
      addItem
    },

    data() {
      return {
        dialogAdd : {
          show : false
        },
        dialogEdit : {   //编辑弹出框，默认是false
          show : false
        },
        batchdelable : true ,
        dialogBatchIn:{
          show : false
        },
        pageTotal: 0,
        searchBtnDisabled : true ,
        form:{    //编辑信息
          /* id:'',
          username:'',
          depart:'',
          age:'',
          sex:'',
          nation:'',
          phone:'',
          salaryid:'',
          address:'',
          role:'' */
        },
        userData:[{
          id:'131',
          username:'123',
          depart:'131',
          age:'',
          sex:'',
          nation:'',
          phone:'',
          salaryid:'',
          address:'',
          role:'123'
        }],
        multipleSelection: []
      }
    },
    computed:{
      newbatchdelable() {
        return this.batchdelable;
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
          this.userData = res.data.userdate;
          this.total = res.date.total
          //this.userData.push(formDate);
        })
      },
    
      handleDelete(index,row) {
        // 删除用户信息
        this.$confirm('确认删除该用户吗?', '提示', {
            type: 'warning'
        })
        .then(() => {
          this.$axios.delete(`http://localhost:3000/data/${row.id}`).then(res =>{
              this.$message({
                  res,
                  type:"success",
                  message:"删除信息成功"
              })
              this.getUserInfo()    //删除数据，更新视图
          })
        })
      },
      BatchDel(){
        this.$confirm('确认批量删除记录吗?', '提示', {
            type: 'warning'
        })
        .then(() => {
            const ids = this.rowIds.map(item => item.id).toString()
            const para = { ids: ids }
            Request(para).then(res => {
                this.$message({
                    message: '批量删除成功',
                    type: 'success'
                })
                this.getUserInfo()
            })
        })
        .catch(() => {})
      },

      handleEdit(index,row){  //编辑
        this.dialogEdit.show = true ;  //显示弹
        this.form = {...row
          /* id:row.id,
          username:row.username,
          depart:row.depart,
          age:row.age,
          sex:row.sex,
          nation:row.nation,
          phone:row.phone,
          salaryid:row.salaryid,
          address:row.address,
          role:row.role */
        }
      },
      handleSelectionChange(val) { 
        
        this.setbatchdelable(val);
      },
      selectAll(val){
        val.forEach((item) => {
          //this.rowIds.push(item.id); 
        });
        this.setbatchdelable(val);
      },
      setbatchdelable(val){
        this.batchdelableg = true;
        if(val.length > 0){
          this.batchdelable = false;
        }else{
          this.batchdelable = true;
        }
      }
    }
  }
</script>

<style lang = "less" scoped>
/* .search_container{
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    } */
</style>