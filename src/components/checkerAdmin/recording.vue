<template>
  <div id = "sturecording"> 
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>待审核列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="recording">
      <p>报销待审核列表</p>
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
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="学号"
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
          axios.post('/findrecording')
            .then(function (res) {
              console.log(res);
              _this.recording = res
              _this.pageTotal = _this.recording.length
            })
            .catch(function (error) {
              console.log(error);
            });

        },
      handleCheck(index,row){
          this.$router.push({path: '/checkerAdmin/recdetail', query:{id:row.id,showcheck:true,showcheckcomplete:false,lasturl:'/checkerAdmin/recording',recordtype:'待'}})
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