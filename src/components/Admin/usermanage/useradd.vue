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
        @select-all="selectAll"
        :row-class-name="rowClassName">
        <el-table-column
          type="selection"
          align='center'
          width="60">
        </el-table-column>
        <!-- <el-table-column
          type="index"
          width="20">
        </el-table-column> -->
        <el-table-column 
          prop="id" 
          label="序号"  
          align="center" 
          width="50">
        </el-table-column>
        <el-table-column
          label="用户号"
          align="center"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.userid }}</span>
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
        <!-- <el-table-column
          label="工资号"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.salaryid}}</span>
          </template>
        </el-table-column> -->
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
  import axios from 'axios'
  import { axiospost } from '@/api/index.js'
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
        edit:false,
        indexNum:'',
        batchdelindex:[],
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
          id:'',//序号行号
          username:'123',
          depart:'131',
          age:'qwe',
          sex:'qe',
          nation:'qwe',
          phone:'eqe',
          userid:'qweqwe',
          address:'eqwe',
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
      //this.getUserInfo();
    },
    methods: {
      hanldeAdd(){  
        this.dialogAdd.show = true ;    
      },
      BatchIn(){
        this.dialogBatchIn.show = true ; 
      },
      getUserInfo(val) {
        if(this.edit){
          this.userData.splice(this.indexNum, 1,val)
          console.log("indexNum：",this.indexNum)
          this.edit=false;
        }else{
          this.userData.splice(0, 0,val)
        }
      },
    
      handleDelete(index,row) {
        // 删除用户信息
        this.$confirm('确认删除该用户吗?', '提示', {
            type: 'warning'
        })
        .then(() => {
          this.userData.splice(index, 1)
          axiospost(`/deleteuser`,{id:row.id}).then(res =>{
            if(res.code==200){
              this.$message.success('删除用户成功')
              this.userData.splice(index, 1)
            }else{
              this.$message.error(res.code || '删除用户失败！')
            }   
          //this.getUserInfo()    //删除数据，更新视图
          })
        })
      },
      BatchDel(){
        this.$confirm('确认批量删除记录吗?', '提示', {
            type: 'warning'
        })
        .then(() => {
          for(let j = 0; j <this.multipleSelection.length;j++){
            for(let i = 0; i <this.userData.length;i++){
              if(this.multipleSelection[j]==this.userData[i].userid){
                this.userData.splice(i, 1)
              }   
            }
          }
          console.log('发送数据：',this.multipleSelection)
          axiospost('/deleteids',this.multipleSelection).then(res => {
            if(res.code==200){
              this.$message.success('批量删除用户成功')
              for(let j = 0; j <this.multipleSelection.length;j++){
                for(let i = 0; i <this.userData.length;i++){
                  if(this.multipleSelection[j]==this.userData[i].userid){
                    this.userData.splice(i, 1)
                  }   
                }
              }
            }
          })
        })
        .catch(() => {})
      },

      handleEdit(index,row){  //编辑
        this.dialogEdit.show = true ;  //显示弹
        this.edit=true;
        this.indexNum = index ;
        console.log("行号：",index,this.indexNum)
        this.form = {...row}
      },
      handleSelectionChange(val) {
        this.multipleSelection=[]
        this.batchdelindex=[]
        console.log("handleSelectionChange:  ",this.multipleSelection,this.batchdelindex)
        val.forEach((item) => {
          this.multipleSelection.push(item.userid)
          this.batchdelindex.push(item.id)
          console.log("handleSelectionChange:  ",this.multipleSelection,this.batchdelindex)  
          //this.rowIds.push(item.id); 
        });
        this.setbatchdelable(val);
      },
      selectAll(val){
        this.multipleSelection=[]
        this.batchdelindex=[]
        console.log("selectCancel:  ",this.multipleSelection,this.batchdelindex)
        val.forEach((item) => {
          this.multipleSelection.push(item.userid)
          this.batchdelindex.push(item.id)
          console.log("selectAll:  ",this.multipleSelection,this.batchdelindex)  
          //this.rowIds.push(item.id); 
        });
        this.setbatchdelable(val);
      },
      setbatchdelable(val){
        this.batchdelableg = true;//true不可用，false可用
        if(val.length > 0){
          this.batchdelable = false;
        }else{
          this.batchdelable = true;
        }
      },
      rowClassName({row, rowIndex}) {
    //把每一行的索引放进row.id
         row.id = rowIndex+1;
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