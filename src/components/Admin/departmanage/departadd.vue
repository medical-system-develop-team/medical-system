<template>
  <div id="departadd">
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
    created(){
            this.getDepartInfo();
        },
    methods: {
      hanldeAdd(){  
        this.dialogAdd.show = true ;    
      },
      getDepartInfo() {
        this.$axios.get('http://localhost:3000/data').then(res => {
          this.departData = res.data  
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
            this.getDepartInfo()    //删除数据，更新视图
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
        console.log('adadad')
      },
    }
  }
</script>

<style lang = "less" scoped>
</style>