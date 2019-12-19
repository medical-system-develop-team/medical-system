<template>
  <div id = "sturecording"> 
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>待审核列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{message}}列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="recording">
      <p>{{message}}报销待审核列表</p>
    </div> 
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
        currentPage:1,
        pagesize:5,
          id:'',//用户种类
          message:'',//汉字用户种类
          usermessage:['学生','职工','退休','离休','医照'],
          lasturl:'',//跳转前路径
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
        // if(to.query.id != from.query.id){
          this.id = to.query.id;
          this.message =this.message
          this.deatils();//重新加载数据
        // }
      }
    },
    created(){
        this.deatils()
      },
    methods: {
        deatils(){
          this.id =this.$route.query.id
          switch(this.id){
            case '1' :
              this.message = "学生" ;
              break;
            case '2' :
              this.message = "职工";
              break;
            case '3' :
              this.message = "退休" ;
              break;
            case '4' :
              this.message = "离休";
              break;
            case '5' :
              this.message = "医照";
              break;
            default:
              break;
          }
          var _this = this
          
          const param={id:_this.id}
          console.log("发送数据：",param) 
          axiospost('/checker/recording',param)//用户类型学生、职工。。。。           
            .then(function (res) {             
              //console.log("返回数据：",res);
              if(res.code === 400){
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
      handleSizeChange:function(size){
          this.pagesize=size;
      },
      handleCurrentChange:function(currentPage){
          this.currentPage=currentPage;
      },
      handleCheck(index,row){
          console.log("报销记录编号：",row.recordId)
          this.$router.push({path: '/checker/recdetail', query:{id:row.recordId,usertype:this.id,message:this.message,showcheck:true,showcheckcomplete:false,lasturl:'/checker/recording'}})
      }
    },
    mounted: function () {
      
      /* var _this = this   //很重要！！
      axios.get('/findall')
        .then(function (res) {
          console.log(res);
          _this.sturec = res.data
         })
        .catch(function (error) {
          console.log(error);
        }); */
    },
    
  }
  
</script>

<style>
 .recording {
    font-family:"楷体";
    text-align:center;
    font-size: 25px; 
  }
</style>