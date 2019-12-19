<template>
  <div id = "sturecording"> 
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>待审核列表</el-breadcrumb-item>
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
        :data="recording.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
            @click="handleCheck(scope.$index, scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination 
        align='center' 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"  
        :current-page="currentPage"  
        :page-sizes="[1,5,10,15]"
        :page-size="pagesize"   
        layout="total,jumper,prev, pager, next,sizes" 
        :total="recording.length">
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
          id:'7',
          recordid:'',
          currentPage:1,
          pagesize:5,
          usermessage:['学生','职工','退休','离休','医照'],
         recording:[
            {
              recordId:'111',
              userName:'dadad',
              userNumber:'12321123',
              recordTime:'19910228',
              userType:'2'
            },
            {
              recordId:'112',
              userName:'dadad',
              userNumber:'12321123',
              recordTime:'19910228',
              userType:''
            },
            {
              recordId:'1113',
              userName:'dadad',
              userNumber:'12321123',
              recordTime:'19910228',
              userType:''
            },
            {
              recordId:'1114',
              userName:'dadad',
              userNumber:'12321123',
              recordTime:'19910228',
              userType:''
            },
            {
              recordId:'1115',
              userName:'dadad',
              userNumber:'12321123',
              recordTime:'19910228',
              userType:''
            },
            {
              recordId:'1116',
              userName:'dadad',
              userNumber:'12321123',
              recordTime:'19910228',
              userType:''
            }
          ],
          pageTotal: 0
      }
    },
    watch: {
      '$route' (to, from) { //监听路由是否变化
        if(to.query.id != from.query.id){
          this.id = to.query.id;
          this.deatils();//重新加载数据
        }
      }
    },
    created(){
        this.deatils()
      },
    computed:{},
    methods: {
      deatils(){
        var _this = this
        const param={id:_this.id}
        console.log("发送数据：",param) 
        axiospost('/checker/recording',param)
          .then(function (res) {             
            //console.log("返回数据：",res);
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
      onSubmit(){
        var _this = this
        const param={id:_this.recordid}//报销记录编号
        console.log("发送数据：",param) 
        axiospost('/checkrecord',param)
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
      handleSizeChange:function(size){
          this.pagesize=size;
      },
      handleCurrentChange:function(currentPage){
          this.currentPage=currentPage;
      },
      handleCheck(index,row){
          this.$router.push({path: '/checkerAdmin/recdetail', query:{message:this.usermessage[row.userType-1],id:row.recordId,showcheck:true,showcheckcomplete:false,lasturl:'/checkerAdmin/recording',recordtype:'待'}})
      }
    },
    mounted: function () {},  
  }
  
</script>

<style>
 .recording {
    font-family:"楷体";
    text-align:center;
    font-size: 25px; 
  }
</style>