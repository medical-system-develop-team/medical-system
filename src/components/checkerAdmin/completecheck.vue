<template>
  <div id = "sturecording"> 
    <div class="grid-content bg-purple-dark">
      <p>已审核列表</p>
    </div> 
    <template>
      <el-table
        :data="recording"
        stripe
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="40">
        </el-table-column>
         <el-table-column
          label="编号"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id}}</span>
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
          label="学号"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.userid}}</span>
          </template>
        </el-table-column>
                <el-table-column
          label="申请时间"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="操作" 
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="recorddetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total"  :total="pageTotal">
      </el-pagination>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
        //sturec:[]
      return {
          id:'',
          recording:[{
            id:'111',
            username:'dadad',
            useridid:'12321123',
            date:'19910228',
          }],
          pageTotal: 0
      }
    },
    watch: {},
    created(){
        this.request()
      },
    methods: {
        request(){
          var _this = this
          axios.post('/findrecording')
            .then(function (res) {
              console.log(res);
              _this.recording = res.data
              _this.pageTotal = res.count
            })
            .catch(function (error) {
              console.log(error);
            });

        },
      recorddetail(index,row){
          this.$router.push({path: '/checkerAdmin/recdetail', query:{id:row.id,showcheck:false,showcheckcomplete:true}})
      }
    },
    mounted: function () {},
    
  }
  
</script>