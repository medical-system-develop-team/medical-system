<template>
  <div id="departadd">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>部门管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加部门</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row >
      <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="hanldeAdd()">添加部门</el-button>
    </el-row>
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
            <span>{{ scope.row.id}}</span>
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
          label="部门总人数"
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
      <DepartInfo :dialogAdd="dialogAdd" @update="getDepartInfo"></DepartInfo>
      <DepartEdit :dialogEdit="dialogEdit" :form="form" @updateEdit="getDepartInfo"></DepartEdit>
    </template>
  </div>
</template>
<script>
  import axios from 'axios'
  import { axiospost } from '@/api/index.js'
  import DepartInfo from './DepartInfo.vue'
  import DepartEdit from './DepartEdit.vue'

  export default {
    name:'departadd',
    
    components:{   
      DepartInfo,
      DepartEdit
    },

    data() {
      return {
        edit:false,
        indexNum:'',
        dialogAdd : {
          show : false
        },
        dialogEdit : {   //编辑弹出框，默认是false
          show : false
        },
        form:{    //编辑信息
          id:'',
          departname:'',
          number:'',
          oldname:''
        },
        departData:[{
          id:'1231231',
          departname:'1312313',
          number:'13',
          oldname:'131',
        }]
      }
    },
    created(){},
    methods: {
      hanldeAdd(){  
        this.dialogAdd.show = true ;    
      },
      getDepartInfo(val) {
        if(this.edit){
          this.departData.splice(this.indexNum, 1,val)
          console.log("indexNum：",this.indexNum)
          this.edit=false;
        }else{
          this.departData.splice(0, 0,val)
        }
      },
    
      handleDelete(index,row) {
        this.$confirm('确认删除该部门吗?', '提示', {
            type: 'warning'
        })
        .then(() => {
          this.departData.splice(index, 1)
          this.$message.success('删除部门成功')
          axiospost(`/deletedepart`,{id:row.id}).then(res =>{
            if(res.code==200){
              this.$message.success('删除部门成功')
              this.departData.splice(index, 1)
            }else{
              this.$message.error(res.code || '删除部门失败！')
            }   
          })
        })
      },
      handleEdit(index,row){  //编辑
        this.dialogEdit.show = true ;  //显示弹
        this.edit=true;
        this.indexNum = index ;
        this.form = {
          id:row.id,
          departname:row.departname,
          number:row.number,
          oldname:row.oldname
        }
      },
    }
  }
</script>

<style lang = "less" scoped>
</style>