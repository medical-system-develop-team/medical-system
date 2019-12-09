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
        <el-input v-model="id" size="mini" placeholder="请输入报销记录号"></el-input>
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
            @click="handleCheck(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      }
    },
    watch: {},
    created(){},
    methods: {
        onSubmit(){
          var _this = this
          axios.post('/findrecording',this.id)
            .then(function (res) {
              console.log(res);
              _this.recording = res
            })
            .catch(function (error) {
              console.log(error);
            });

        },
      handleCheck(index,row){
          this.$router.push({path: '/shoudanyuan/recdetail',query:{id:row.id}})
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