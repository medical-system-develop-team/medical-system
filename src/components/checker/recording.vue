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
            <span>{{ scope.row.userid}}</span>
          </template>
        </el-table-column>
                <el-table-column
          label="申请时间"
          width="150">
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
            @click="handleCheck(scope.$index, scope.row)">审核</el-button>
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
          id:'',//用户种类
          message:'',//汉字用户种类
          lasturl:'',//跳转前路径
          recording:[{
            recordId:'111',
            userName:'dadad',
            userid:'12321123',
            date:'19910228',
          }],
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
    methods: {
        deatils(){
          this.id =this.$route.query.id
          //console.log("asdasd",this.id)
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
          axiospost('/checker/recording',_this.id)//用户类型学生、职工。。。。
            .then(function (res) {
              console.log(res);
              if(res.date === 400){
                this.$message.error(res.msg || '查询失败')
                return
              }else{
                _this.recording.push(res.data)
                _this.pageTotal = res.count
              }
            })
            .catch(function (error) {
              console.log(error);
            });

        },
      handleCheck(index,row){
          this.$router.push({path: '/checker/recdetail', query:{id:row.id,usertype:this.id,message:this.message,showcheck:true,showcheckcomplete:false,lasturl:'/checker/recording'}})
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