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
      <el-form :inline="true" :model="record"  size="mini" label-width="90px" class="demo-ruleForm" >
        <el-row>
          <el-form-item label="用户名">
            <!-- <el-col :span="6"> -->
              <el-input v-model="record.username" placeholder="用户名"></el-input>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="record.depart" placeholder="部门"></el-input>
          </el-form-item>                 
          <el-form-item label="工资号">
            <el-input v-model="record.salaryid" placeholder="用户工资号"></el-input>
          </el-form-item>
          <el-form-item label="报销类型">
            <!-- <el-col :span="11"> -->
            <el-select v-model="record.type" placeholder="报销类型" >
              <el-option label="学生报销类型" value="student"></el-option>
              <el-option label="在职职工报销类型" value="worker"></el-option>
              <el-option label="退休人员报销类型" value="retired"></el-option>
              <el-option label="离休人员报销类型" value="lixiu"></el-option>
              <el-option label="特殊群体报销类型" value="teshu"></el-option>
            </el-select>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="报销时间">
              <el-col :span="10">
                <el-date-picker type="date" placeholder="选择日期" v-model="record.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-date-picker type="date" placeholder="选择日期" v-model="record.date2" style="width: 100%;"></el-date-picker>
              </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="record.sex" placeholder="性别" style="width:90%">
              <el-option label="男" value="boy"></el-option>
              <el-option label="女" value="girle"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报销金额">
              <el-col :span="11">
                <el-input  placeholder="最小费用" v-model="record.cost1" ></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input  placeholder="最大费用" v-model="record.cost2" ></el-input>
              </el-col>
          </el-form-item>
          <el-form-item label="就医医院">
            <el-autocomplete
              class="inline-input"
              v-model="record.hospital"
              :fetch-suggestions="hospitalSearch"
              placeholder="就医医院"
              @select="handleSelect">
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="医事服务费">
              <el-col :span="11">
                <el-input  placeholder="最小费用" v-model="record.servercost1" style="width: 100%;"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input  placeholder="最大费用" v-model="record.servercost2" style="width: 100%;"></el-input>
              </el-col>
          </el-form-item>   
          <el-form-item label="就医科室">
            <el-autocomplete
              class="inline-input"
              v-model="record.keshi"
              :fetch-suggestions="keshiSearch"
              placeholder="就医科室"
              @select="handleSelect">
            </el-autocomplete>
          </el-form-item>

          <el-form-item label="年龄" >
            <el-col :span="11">
              <el-input v-model="record.age1" placeholder="年龄" style="width: 100%;"></el-input>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input placeholder="年龄" v-model="record.age2" style="width: 100%;"></el-input>
            </el-col>
          </el-form-item>          
                 
          
          
          <el-form-item label="审核人">
              <el-col :span="11">
                <el-input placeholder="审核人" v-model="record.checker"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input placeholder="审核人编号" v-model="record.checkerid"></el-input>
              </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    

     <template>
      <el-table
        :data="recordData"
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
          width="80">
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
      <el-pagination background layout="total"  :total="pageInfo.pageTotal">
      </el-pagination>
    </template>
  </div>
</template>
<script>
 export default {
    data() {
      return {
        HostSearch:[],
        keSearch:[],
        record: {
          username: '',
          type: '',
          salaryid:'',
          sex:'',
          age1:'',
          age2:'',
          date1:'',
          date2:'',
          depart:'',
          servercost1:'',
          servercost2:'',
          hospital:'',
          keshi:'',
          cost1:'',
          cost2:'',
          checker:'',
          checkerid:''
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
      onSubmit() {
        console.log('submit!');
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