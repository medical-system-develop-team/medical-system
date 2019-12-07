<template>
  <div class="myRecords">
    <navmenu />
    <h1>我的报销列表</h1>
    
    <el-table class="recordTable" :data="recordData" style="width: 100%">
      <el-table-column prop="number" label="序号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recordID" label="报销记录ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordID }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recordStatus" label="报销状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <div  v-if="scope.row.recordStatus !== '已确认' && ''">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
          <div  v-if="scope.row.recordStatus == '已确认'">
            <el-button size="mini" @click="handleCreate(scope.$index, scope.row)">生成报销单</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
// @ is an alias to /src
import navmenu from '@/components/student/navmenu.vue'
import { getRecords } from '@/api/index.js'

export default {
  name: 'myRecords',
  components: {
    navmenu
  },
  data() {
    return {
      recordData: [
        // {
        // number:'',
        // recordID: '',
        // createTime: '',
        // recordStatus: '',
        // opration:''
        // }
      ], 

      // recordData: [{
      //   number:'1',
      //   recordID: 'a',
      //   createTime: '2019-11-16 16:33:36.0',
      //   recordStatus: '暂存',
      //   //opration:''
      // }, {
      //   number:'2',
      //   recordID: 'b',
      //   createTime: '2019-11-17 16:33:36.0',
      //   recordStatus: '已提交未审核',
      // }, {
      //   number:'3',
      //   recordID: 'c',
      //   createTime: '2019-11-18 16:33:36.0',
      //   recordStatus: '审核未通过',
      // }, {
      //   number:'4',
      //   recordID: 'd',
      //   createTime: '2019-11-19 16:33:36.0',
      //   recordStatus: '审核通过未确认',
      // }, {
      //   number:'5',
      //   recordID: 'e',
      //   createTime: '2019-11-20 16:33:36.0',
      //   recordStatus: '已确认',
      // }]
    }
  },
  created(){
    this.getRecordsList();
  },
  methods: {
    getRecordsList(){
      getRecords().then(
        response => {
          this.recordData.push(response)
        })
    },
    handleEdit(index, row){

    },
    handleDelete(index, row){

    },
    handleCreate(index, row){

    }
  },


}
</script>

<style lang="less">
// .myRecords {
//   .recordTable {
//     width: 100%; 
//     text-align :center
//   }
// }

</style>