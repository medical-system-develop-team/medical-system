<template>
  <div id="recordcheck">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item></el-breadcrumb-item>
        <el-breadcrumb-item>报销记录管理</el-breadcrumb-item>
        <el-breadcrumb-item>报销记录查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style='margin-top: 20px;'>
      <el-form :inline="true" :model="record"  size="mini" label-width="100px" label="right" style="text-align:left;">
        <el-form-item label="用户" style="margin-left: 10vw;" >
          <el-col :span="11">
            <el-input placeholder="用户名" v-model="record.username"></el-input>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center;">-</el-col>
          <el-col :span="11">
            <el-input placeholder="用户号" v-model="record.userid"></el-input>
          </el-col>
        </el-form-item>       
      </el-form>

      <el-form :inline="true" :model="record"  size="mini" label-width="100px" label="right" style="text-align:left;">       
        <el-form-item label="审核人" style="margin-left: 10vw;" >
          <el-col :span="11">
            <el-input placeholder="审核人" v-model="record.checker"></el-input>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center;">-</el-col>
          <el-col :span="11">
            <el-input placeholder="审核人编号" v-model="record.checkerid"></el-input>
          </el-col>
        </el-form-item>          
        <el-form-item label="报销类型" style="margin-left: 10vw;">
          <el-select v-model="record.recordtype" placeholder="报销类型" style="width:86%" >
            <el-option label="学生报销类型" value="student"></el-option>
            <el-option label="在职职工报销类型" value="worker"></el-option>
            <el-option label="退休人员报销类型" value="retired"></el-option>
            <el-option label="离休人员报销类型" value="lixiu"></el-option>
            <el-option label="特殊群体报销类型" value="teshu"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="就医医院">
          <el-autocomplete
            class="inline-input"
            v-model="record.hospital"
            :fetch-suggestions="hospitalSearch"
            placeholder="就医医院"
            @select="handleSelect">
          </el-autocomplete>
        </el-form-item> -->     
        <!-- <el-form-item label="就医科室">
          <el-autocomplete
            class="inline-input"
            v-model="record.keshi"
            :fetch-suggestions="keshiSearch"
            placeholder="就医科室"
            @select="handleSelect">
          </el-autocomplete>
        </el-form-item> -->
        <el-form-item   style="margin-left: 13%;">
          <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        </el-form-item>                       
      </el-form>
      <!-- <el-button type="primary" size="mini" @click="onSubmit" style="margin-left: 65%;">查询</el-button> -->
    </div>
    

     <template>
      <el-table
        :data="recordData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          label="编号"
          align="center"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          align="center"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.depart}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="医院"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.hospital}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="科室"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.keshi}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="报销金额"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.cost}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核人"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.checker}}</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="详情"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
        :total="recordData.length">
      </el-pagination>
    </template>
  </div>
</template>
<script>
  import axios from 'axios'
  import { axiospost } from '@/api/index.js'
  export default {
    data() {
      return {
        usertype:['学生','职工','退休','离休','医照'],
        HostSearch:[],
        keSearch:[],
        currentPage:1,
        pagesize:5,
        pageTotal: 0,
        record: {
          username: '',
          userid:'',
          checker:'',
          checkerid:'',
          recordtype:''
        },
        recordData:[{
          id:'131231231',
          username:'1231313',
          depart:'13123123',
          hospital:'123',
          keshi:'123',
          cost:'123',
          checker:'12',
        }],
        pageInfo: { //分页
          pageTotal: 1
        },
      }
    },
    methods: {
      hospitalSearch(queryString, cb) {
        var HostSearch = this.HostSearch;
        var results = queryString ? HostSearch.filter(this.createHost(queryString)) : HostSearch;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleEdit(index,row){
          this.$router.push({path: '/Admin/recordmanage/recdetail',query:{id:row.id}})
      },
      createHost(queryString) {  
        return (HostSearch) => {
          return (HostSearch.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadHost() {
        return [
          { "value": "航天中心医院"},
          { "value": "武警总医院"},
          { "value": "解放军总医院(301医院）"},
          { "value": "三街坊社区医院"},
          { "value": "永定路街道医院"},
        ];
      },
      indexMethod(index) {
        return index;
      },
      handleSelect(item) {
        console.log(item);
      },
       keshiSearch(queryString, cb) {
        var keSearch = this.keSearch;
        var results = queryString ? keSearch.filter(this.createKeshi(queryString)) : keSearch;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createKeshi(queryString) {
        return (keSearch) => {
          return (keSearch.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadKeshi() {
        return [
          { "value": "呼吸内科"},
          { "value": "消化内科"},
          { "value": "神经内科"},
          { "value": "心血管内科"},
          { "value": "内分泌科"},
          { "value": "血液内科"},
          { "value": "普外科"},
          { "value": "骨科"},
          { "value": "神经外科"},
          { "value": "心胸外科"},
          { "value": "泌尿外科"},
          { "value": "颈椎科"},
          { "value": "腰椎科"},
          { "value": "中医科"},
          { "value": "传染科"},
          { "value": "皮肤科"},
        ];
      },
      handleSizeChange:function(size){
          this.pagesize=size;
      },
      handleCurrentChange:function(currentPage){
          this.currentPage=currentPage;
      },
      onSubmit() {
        var _this = this
        axiospost('/findrecording',_this.record)
          .then(function (res) {             
              //console.log("返回数据：",res);
              if(res.code === 400){
                this.$message.error(res.msg || '查询失败')
                return
              }else{
                _this.recordData = res
                console.log("接收数据：",_this.recordData) 
                _this.pageTotal = _this.recordData.length
              }
            })
          .catch(function (error) {
            console.log(error);
          });

      }
    },
    mounted() {
      this.HostSearch = this.loadHost();
       this.keSearch = this.loadKeshi();
    }
  }
</script>

<style>
.form .el-form-item__label{
  font-size: 11px; 
}
</style>