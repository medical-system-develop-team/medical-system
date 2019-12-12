<template>
  <div id = "sturecording"> 
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>已审核列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="completecheck">
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
          align="center"
          width="60">
        </el-table-column>
         <el-table-column
          label="编号"
          align="center"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.recordId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户号"
          align="center"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.userNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="申请时间"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.recordTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户类型"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{usermessage[scope.row.userType-1]}}</span>
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
import { axiospost } from '@/api/index.js'
import axios from 'axios'
  export default {
    data() {
        //sturec:[]
      return {
          id:'6',
          usermessage:['学生','职工','退休','离休','医照'],
          recording:[{
            recordId:'111',
            userName:'dadad',
            userNumber:'12321123',
            recordTime:'19910228',
            userType:'2'
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
          const param={id:_this.id}
          console.log("发送数据：",param) 
          axiospost('/checker/recording',param)
            .then(function (res) {
              //console.log(res);
              if(res.date === 400){
                this.$message.error(res.msg || '查询失败')
                return
              }else{
                _this.recording = res
                console.log("接收数据：",_this.recording) 
                _this.pageTotal = _this.recording.length
              }
            })
            .catch(function (error) {
              console.log(error);
            });

        },
      recorddetail(index,row){
          this.$router.push({path: '/checker/recdetail', query:{id:row.recordId,showcheck:false,showcheckcomplete:true,message:this.usermessage[row.userType-1],lasturl:'/checker/completecheck'}})
      }
    },
    mounted: function () {},
    
  }
  
</script>

<style>
  .completecheck {
    font-family:"楷体";
    text-align:center;
    font-size: 25px; 
  }
</style>
