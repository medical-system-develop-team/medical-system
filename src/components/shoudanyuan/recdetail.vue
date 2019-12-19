<template>
  <div id = "user" style="height:100%">   
    <el-scrollbar style="height:100%">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/shoudanyuan/recording'}">报销列表</el-breadcrumb-item>
          <el-breadcrumb-item>报销详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="text-align: center;">
        <h2>报销凭证</h2>
        <el-form ref="form" :inline="true" label-width="200px" style="margin-top: 5px;">'
          <el-form-item  label="医事服务费自负比例：">
            <el-input size="mini" v-model="registerPercentage" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="医药费自负比例：">
            <el-input size="mini"  v-model="medicalPercentage" :readonly="true"></el-input>
          </el-form-item>
        </el-form>
      </div>  
   <!--  <el-container style="height:100%" >
      <el-main>
        <el-scrollbar style="height:100%"> -->
      <div class="referral">
        <div v-for="(item, index) in changehospital" :key="index+'1'">
          <div class="title1" style="margin-top:10px;">
            <b style="font-size:15px;">转诊单{{index+1}}</b>
          </div>
          <div class="content" style="margin-top:10px;">
            <el-form ref="form" :inline="true"  label-width="100px" class="demo-form-inline" style='text-align:left;'>
              <el-form-item label="医院：">
                <el-input size="small" v-model="item.changehospitalIn" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="日期：">
                <el-input size="small"  v-model="item.changehospitalDate" :readonly="true"></el-input>
              </el-form-item><br>
            </el-form>
            <el-form label-width="100px" :inline="true">
              <el-form-item >
              <label>转诊单：</label><br>
                <el-image 
                  style="width: 100px; height: 100px;"
                  :src="imageurl" 
                  :preview-src-list="[imageurl]">
                  <!-- :src="item.changehospitalImage" 
                  :preview-src-list="[item.changehospitalImage]"> -->
                </el-image><br>
              </el-form-item>
            </el-form>
          </div>      
        </div>
          
        <div v-for="(item, index) in register" :key="index+'2'">
          <div class="title1" style="margin-top:10px;">
            <b style="font-size:15px;">医事服务费(挂号费){{index+1}}</b>
          </div>
          <div class="content" style="margin-top:10px;">
            <el-form ref="form" :inline="true"  label-width="100px" class="demo-form-inline" style='text-align:left;'>
              <el-form-item label="医院：">
                <el-input size="small" v-model="item.registerHospital" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="科室：">
                <el-input size="small"  v-model="item.registerDepartment" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="金额：">
                <el-input size="small" v-model="item.registerCost" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="自费：">
                <el-input size="small"  v-model="item.registerSelfCost" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="日期：">
                <el-input size="small" v-model="item.registerDate" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="说明：">
                <el-input size="small"  v-model="item.registerExplaination" :readonly="true"></el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px" :inline="true">
              <el-form-item >
                <label>医事服务费（挂号费）：</label><br>
                <el-image 
                  style="width: 100px; height: 100px;"
                  :src="imageurl" 
                  :preview-src-list="[imageurl]">
                  <!-- :src="item.registerImage" 
                  :preview-src-list="[item.registerImage]"> -->
                </el-image><br>
              </el-form-item>
            </el-form>
          </div> 
        </div>
        
        <div v-for="(item, index) in bill" :key="index+'3'">
          <div class="title1" style="margin-top:10px;">
            <b style="font-size:15px;">药费单据{{index+1}}</b>
          </div>
          <div class="content" style="margin-top:10px;">
            <el-form ref="form" :inline="true" label-width="100px" class="demo-form-inline" style='text-align:left;'>
              <el-form-item label="医院：">
                <el-input size="small" v-model="item.billHospital" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="科室：">
                <el-input size="small"  v-model="item.billDepartment" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="金额：">
                <el-input size="small" v-model="item.billCost" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="自费负担：">
                <el-input size="small"  v-model="item.billSelfCost" :readonly="true"></el-input>
              </el-form-item>
              <!--  <el-form-item label="特殊负担：">
                <el-input size="small" v-model="item.specialfee" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="部分负担：">
                <el-input size="small"  v-model="item.partfee" :readonly="true"></el-input>
              </el-form-item> -->
              <el-form-item label="日期：">
                <el-input size="small" v-model="item.billDate" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="说明：">
                <el-input size="small"  v-model="item.billExplaination" :readonly="true"></el-input>
              </el-form-item><br>
            </el-form>
            <el-form label-width="100px" :inline="true">
              <el-form-item >
                <label>药费单据:</label><br>
                <el-image 
                  style="width: 100px; height: 100px;"
                  :src="imageurl" 
                  :preview-src-list="[imageurl]">
                  <!-- :src="item.billImage" 
                  :preview-src-list="[item.billImage]"> -->
                </el-image><br>
              </el-form-item>
              <el-form-item >
                <label>处方:</label><br>
                <el-image 
                  style="width: 100px; height: 100px;"
                  :src="imageurl" 
                  :preview-src-list="[imageurl]">
                  <!-- :src="item.billPrescriptionImage" 
                  :preview-src-list="[item.billPrescriptionImage]"> -->
                </el-image><br>
              </el-form-item>
            </el-form>
          </div> 
        </div>

        <div :model="Form" style="margin-top: 10px;" >
          <el-form label-width="100px" style='text-align:left;'>        
            <el-form-item  label="外伤说明：">
              <el-col :span="18">  
                <el-input    
                  type="textarea"
                  :rows="2"
                  v-model="Form.formText" 
                  :readonly=true>
                </el-input>
              </el-col>  
            </el-form-item>
          </el-form>
          <el-form label-width="100px" :inline="true">
            <el-form-item >
              <label>签字盖章证明：</label><br>
              <el-image 
                style="width: 100px; height: 100px; "
                :src="imageurl" 
                :preview-src-list="[imageurl]">
                <!-- :src="Form.gaizhangImage" 
                :preview-src-list="[Form.gaizhangImage]"> -->
              </el-image><br>
            </el-form-item>
            <el-form-item >
              <label style="margin-left: 5vw;">特殊用药说明：</label><br>
              <el-image 
                style="width: 100px; height: 100px; margin-left: 5vw;"
                :src="imageurl" 
                :preview-src-list="[imageurl]">
                <!-- :src="Form.teshuImage" 
                :preview-src-list="[Form.teshuImage]"> -->
              </el-image><br>
            </el-form-item>             
          </el-form>
        </div>

        <div style="margin-top: 10px;">
          <el-form label-width="100px"  style='text-align:left;'>
            <el-form-item label="报销金额：">
              <el-col :span="18"> 
                <el-input size="small"  v-model="recordmoney" :readonly="true"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="备注：">
              <el-col :span="18">
                <el-input size="small" type="textarea"  v-model="beizhu" :readonly="true"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <el-form :inline="true" class="demo-form-inline add-form">
          <el-form-item class="btnRight">
            <el-button type="success" size ="mini" icon="view" style="margin-right: 20px;" @click='back()'>返回</el-button>
            <el-button size="mini" type="danger" @click="shoudan()" :disabled="runcheck">收单</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import { axiospost } from '@/api/index.js'
  import axios from 'axios'
  export default {
    data() {
        //sturec:[]
      return {
        imageurl:require('../../../static/img/0.jpg'),
        recordid:'',
        message:'',
        runcheck:false,
        registerPercentage:'',
        medicalPercentage:'0.2',
        beizhu:'',
        recording:[],
        recordmoney:'',
        changehospital:[{}],
        register:[{registerDepartment:111,registerCost:100},{registerDepartment:222,registerCost:10}],
        bill:[{billCost:100},{billCost:10}],
        Form:{},
      }
    },
    created(){
        this.deatils()
      },
    methods: {
        deatils(){
          this.recordid =this.$route.query.id//报销记录编号
          var _this = this
          const param={recordId:_this.recordid}
          console.log("发送数据：",param) 
          axiospost('/recording/detail',param)
            .then(function (res) {
              console.log(res);
              if(res.code === 400){
                this.$message.error(res.msg || '查询失败')
                return
              }else{
                _this.registerPercentage = res.registerPercentage//医事服务费自负比例医药费自负比例
                _this.medicalPercentage = res.medicalPercentage
                _this.beizhu = res.beizhu
                _this.changehospital = res.changehospitalList
                _this.register = res.registerList
                _this.bill = res.billList
                _this.Form.formText=res.form.formText 
                _this.Form.teshuImg=res.form.teshuImg
                _this.Form.gaizhangImg=res.form.gaizhangImg
                _this.Form.formId=res.form.formId
                _this.Form.formTime=res.form.formTime    
                _this.recordmoney = res.recordmoney
              }
            })
            .catch(function (error) {
              console.log(error);
            });

        },
        shoudan(index,row){
          var _this = this
          this.$confirm('确认收单?', '提示', {
              type: 'warning'
          })
          .then(() => {
            const param={id:_this.recordid}//报销记录编号
            console.log("发送数据：",param) 
            this.$message.success('收单成功')
            this.runcheck = true
            axiospost('/shoudanyuan/shoudan',param)
            .then(function (res) {
              if(res.code === 400){
                this.$message.error('收单失败')
                return
              }else{
                this.$message.success('收单成功')
                this.runcheck = true
              }
            }) 
          })          
          .catch(function (error) {
            console.log(error);
          });
        },
        back(){
          this.$router.push({path: '/shoudanyuan/recording'})
        },
    },
    mounted: function () {},
    
  }
  
</script>

<style lang="less" scoped>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .referral {
    margin-top: 0px;
  }
  .title1 {
    background-color: #a3d9f3;
  }，
  .content {
    margin-top: 15px;
  }，
  .button {
    margin-top: 50px;
    margin-bottom: 10px;
  }
</style>