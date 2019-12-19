<template>
  <div id = "sturecording"> 
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>报销列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :inline="true" class="demo-form-inline">
      <el-form-item label="报销编号">
        <el-input v-model="recordid" size="mini" placeholder="请输入报销记录号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
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
            @click="handleCheck(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import axios from 'axios'
  import { axiospost } from '@/api/index.js'
  export default {
    data() {
        //sturec:[]
      return {
          recordid:'',
          usermessage:['学生','职工','退休','离休','医照'],
          recording:[{
            recordId:'111',
            userName:'dadad',
            userNumber:'12321123',
            recordTime:'19910228',
            userType:'2'
          }],
      }
    },
    watch: {},
    created(){},
    methods: {
        onSubmit(){
          var _this = this
          const param={id:_this.recordid}//报销记录编号
          console.log("发送数据：",param) 
          axiospost('/shoudanyuan/recording',param)
            .then(function (res) {
              if(res.date === 400){
                this.$message.error(res.msg || '查询失败')
                return
              }else{
                _this.recording = res
                console.log("接收数据：",_this.recording) 
                //_this.pageTotal = _this.recording.length
              }
            })
            .catch(function (error) {
              console.log(error);
            });

        },
        
      handleCheck(index,row){
          this.$router.push({path: '/shoudanyuan/recdetail',query:{id:row.recordId}})
      }
    },
    mounted: function () {},    
  }
  
</script>