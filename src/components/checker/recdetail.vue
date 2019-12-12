<template>
  <div id = "user" style="height:100%">   
    <el-scrollbar style="height:100%">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item></el-breadcrumb-item>
          <el-breadcrumb-item v-if="showcheck">待审核列表</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: lasturl, query:{id:usertype}}">{{message}}列表</el-breadcrumb-item>
          <el-breadcrumb-item>报销详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="text-align: center;">
        <h2>审核报销凭证</h2>
        <small>类型:{{message}}</small>
        <el-form :inline="true" style="margin-top: 5px;text-align:left;margin-left: 6.5vw;" > 
          <el-form-item  label="医事服务费自负比例：">
            <el-input size="mini" v-model="registerPercentage"   :readonly=showcheckcomplete></el-input>
          </el-form-item>
          <el-form-item label="医药费自负比例：">
            <el-input size="mini"  v-model="medicalPercentage"  :readonly=showcheckcomplete></el-input>
          </el-form-item>
        </el-form>
      </div>  

      <div class="referral">
        <div v-for="(item, index) in changehospital" :key="index+'1'">
          <div class="title1" style="margin-top:10px;">
            <b style="font-size:15px;">转诊单{{index+1}}</b>
          </div>
          <div class="content" style="margin-top:10px;">
            <el-form ref="form" :inline="true"  label-width="100px" class="demo-form-inline">
              <el-form-item label="医院：">
                <el-input size="small" v-model="item.changehospitalIn" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="日期：">
                <el-input size="small"  v-model="item.changehospitalDate" :readonly="true"></el-input>
              </el-form-item><br>
              <el-form-item >
                <label>转诊单：</label><br>
                <!-- <div class="imageBox" style="margin-top: 10px;"> -->
                  <el-image 
                    style="width: 100px; height: 100px;"
                    :src="item.changehospitalImage" 
                    :preview-src-list="item.changehospitalImage">
                  </el-image><br>
                  <el-button type="primary" size="mini" style="margin-top:5px;" onclick="handleImgDirection();">旋转90°</el-button>
                <!-- </div> -->
              </el-form-item>
            </el-form>
          </div>
          <!-- <div class="imageBox" style="margin-top:10px;">
            <span style="font-size:15px;">转诊单：</span><br>
            <el-image 
              style="width: 100px; height: 100px"
              :src="imageurl[0]" 
              :preview-src-list="imageurl[0]">
            </el-image><br>
            <el-button type="primary" size="mini" style="margin-top:10px;" onclick="handleImgDirection();">旋转90°</el-button>
          </div>    -->    
        </div>
          
        <div v-for="(item, index) in register" :key="index+'2'">
          <div class="title1" style="margin-top:10px;">
            <b style="font-size:15px;">医事服务费(挂号费){{index+1}}</b>
          </div>
          <div class="content" style="margin-top:10px;">
            <el-form ref="form" :inline="true"  class="demo-form-inline" label-width="100px" style='text-align:left;'><!-- margin-left: 10%; -->
              <el-form-item label="医院：" >
                <el-input size="small" v-model="item.registerHospital" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="科室：">
                <el-input size="small"  v-model="item.registerDepartment" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="金额：" >
                <el-input size="small" v-model="item.registerCost" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="自费：" >
                <el-input size="small"  v-model="item.Zifei" @focus="zifeijisuan1(item)" :readonly=showcheckcomplete></el-input>
              </el-form-item>
              <el-form-item label="日期：">
                <el-input size="small" v-model="item.registerDate" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="说明：">
                <el-input size="small"  v-model="item.registerExplaination" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item >
                <label style="margin-left: 23vw;">医事服务费（挂号费）：</label>
                <div class="imageBox" style="margin-top: 10px;">
                  <el-image 
                    style="width: 100px; height: 100px; margin-left: 25vw;"
                    :src="item.registerImage" 
                    :preview-src-list="item.registerImage">
                  </el-image><br>
                  <el-button type="primary" size="mini" style="margin-top:5px;  margin-left: 26vw;" onclick="handleImgDirection();">旋转90°</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div> 
          
        </div>
        
        <div v-for="(item, index) in bill" :key="index+'3'">
          <div class="title1" style="margin-top:10px;">
            <b style="font-size:15px;">药费单据{{index+1}}</b>
          </div>
          <div class="content" style="margin-top:10px;">
            <el-form ref="form" :inline="true" class="demo-form-inline" label-width="100px" style='text-align:left;'>
              <el-form-item label="医院：">
                <el-input size="small" v-model="item.billHospital" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="科室：">
                <el-input size="small"  v-model="item.billDepartment" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="金额：">
                <el-input size="small" v-model="item.billCost" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="自费负担：" ><!-- //v-if="showcheckcomplete" -->
                <el-input size="small"  v-model="item.zifei" @focus="zifeijisuan2(item)" :readonly=showcheckcomplete></el-input>
              </el-form-item>
              <!-- <el-form-item label="特殊负担：">
                <el-input size="small" v-model="item.specialfee" :readonly=showcheckcomplete></el-input>
              </el-form-item>
              <el-form-item label="部分负担：">
                <el-input size="small"  v-model="item.partfee" :readonly=showcheckcomplete></el-input>
              </el-form-item> -->
              <el-form-item label="日期：">
                <el-input size="small" v-model="item.billDate" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="说明：">
                <el-input size="small"  v-model="item.billExplaination" :readonly="true"></el-input>
              </el-form-item><br>
              <el-form-item >
                <label style="margin-left: 21vw;">药费单据:</label><br>
                <!-- <div class="imageBox" style="margin-top: 10px;"> -->
                  <el-image 
                    style="width: 100px; height: 100px; margin-left: 20vw;"
                    :src="item.billImage" 
                    :preview-src-list="item.billImage">
                  </el-image><br>
                  <el-button type="primary" size="mini" style="margin-top:5px;  margin-left: 21vw;" onclick="handleImgDirection();">旋转90°</el-button>
                <!-- </div> -->
              </el-form-item>
              <el-form-item >
                <label style="margin-left: 7vw;">处方:</label><br>
                <!-- <div class="imageBox" style="margin-top: 10px;"> -->
                  <el-image 
                    style="width: 100px; height: 100px; margin-left: 5vw;"
                    :src="item.billPrescriptionImage" 
                    :preview-src-list="item.billPrescriptionImage">
                  </el-image><br>
                  <el-button type="primary" size="mini" style="margin-top:5px;  margin-left: 6vw;" onclick="handleImgDirection();">旋转90°</el-button>
                <!-- </div> -->
              </el-form-item>
            </el-form>
          </div> 
          <!-- <div class="imageBox" style="margin-top:10px;">
            <span style="font-size:15px;">药费单据：</span><br>
            <el-image 
              style="width: 100px; height: 100px"
              :src='imageurl[2]' 
              :preview-src-list='imageurl[2]'>
            </el-image><br>
            <el-button type="primary" size="mini" style="margin-top: 10px;margin-buttom: 10px;" onclick="handleImgDirection();">旋转90°</el-button><br>
            <span style="font-size:15px;">处方：</span><br>
            <el-image 
              style="width: 100px; height: 100px;"
              :src='imageurl[3]' 
              :preview-src-list='imageurl[3]'>
            </el-image><br>
            <el-button type="primary" size="mini" style="margin-top: 10px;" onclick="handleImgDirection();">旋转90°</el-button>
          </div> -->
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
              <!-- <div class="imageBox" style="margin-top: 10px;"> -->
                <el-image 
                  style="width: 100px; height: 100px; "
                  :src="Form.gaizhangImage" 
                  :preview-src-list="Form.gaizhangImage">
                </el-image><br>
                <el-button type="primary" size="mini" style="margin-top:5px;" onclick="handleImgDirection();">旋转90°</el-button>
                <!-- </div> -->
              </el-form-item>
              <el-form-item >
                <label style="margin-left: 5vw;">特殊用药说明：</label><br>
                <!-- <div class="imageBox" style="margin-top: 10px;"> -->
                  <el-image 
                    style="width: 100px; height: 100px; margin-left: 5vw;"
                    :src="Form.teshuImage" 
                    :preview-src-list="Form.teshuImage">
                  </el-image><br>
                  <el-button type="primary" size="mini" style="margin-top:5px;  margin-left: 6vw;" onclick="handleImgDirection();">旋转90°</el-button>
                <!-- </div> -->
              </el-form-item>             
          </el-form>
          <!-- <div class="imageBox" style="margin-top:10px;">
            <span style="font-size:15px;">签字盖章证明：</span><br>
            <el-image 
              style="width: 100px; height: 100px"
              :src='imageurl[4]' 
              :preview-src-list='imageurl[4]'>
            </el-image><br>
            <el-button type="primary" size="mini" style="margin-top: 10px;margin-buttom: 10px;" onclick="handleImgDirection();">旋转90°</el-button><br>
            <span style="font-size:15px;">特殊用药说明：</span><br>
            <el-image 
              style="width: 100px; height: 100px;"
              :src='imageurl[5]' 
              :preview-src-list='imageurl[5]'>
            </el-image><br>
            <el-button type="primary" size="mini" style="margin-top: 10px;" onclick="handleImgDirection();">旋转90°</el-button>
          </div> -->
        </div>

        <div style="margin-top: 10px;" >
          <el-form label-width="100px"  style='text-align:left;'>
            <el-form-item label="报销金额：" v-if="showcheckcomplete">
              <el-col :span="18"> 
                <el-input size="small"  v-model="recordmoney" :readonly=showcheckcomplete></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="报销金额：" v-if="showcheck">
              <el-col :span="18"> 
                <el-input size="small"  v-model="recordmoney" @focus="recordmoneyjisuan()" :readonly=showcheckcomplete></el-input>
              </el-col>
            </el-form-item>           
            <el-form-item  label="备注："> 
              <el-col :span="18"> 
                <el-input 
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容" 
                  v-model="beizhu" 
                  :readonly=showcheckcomplete>
                </el-input>
              </el-col>  
            </el-form-item>              
          </el-form>
        </div>
        
        <el-form :inline="true" class="demo-form-inline add-form" v-if="showcheck">
          <el-form-item class="btnRight">
            <el-button type="success" size ="mini" icon="view" style="margin-right: 30px;" @click='back()'>返回列表</el-button>
            <el-button type="warning" size ="mini" icon="view" @click="checkpass();">审核完成</el-button>
            <el-button type="danger" size ="mini" icon="view" @click="checkback();">审核退回</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" class="demo-form-inline add-form" v-if="showcheckcomplete">
          <el-form-item class="btnRight">
            <el-button type="success" size ="mini" icon="view" style="margin-right: 20px;" @click='backcomplete()'>返回列表</el-button>
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
        imageurl:[],
        recordid:'',
        usertype:'',
        message:'',
        usertypemessage:['学生','职工','退休','离休','医照'],
        lasturl:'',
          
        beizhu:'',
        recordmoney:'',
        showcheck:true,
        showcheckcomplete:false,
        recording:[],
        changehospital:[{}],
        register:[{registerDepartment:111,registerCost:100},{registerDepartment:222,registerCost:10}],
        bill:[{billCost:100},{billCost:10}],
        Form:{},
        registerPercentage:'0.2',
        medicalPercentage:'0.2'

      };
    },
    created(){
        this.deatils()
      },
    methods: {
        deatils(){
          this.recordid =this.$route.query.id//报销记录编号
          this.usertype = this.$route.query.usertype
          this.message = this.$route.query.message
          this.lasturl = this.$route.query.lasturl
          this.showcheck = this.$route.query.showcheck
          this.showcheckcomplete = this.$route.query.showcheckcomplete
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
                _this.Form = res.Form
                _this.recordmoney = res.recordmoney
              }
            })
            .catch(function (error) {
              console.log(error);
            });

        },
        checkpass(){
          axiospost('/checkerpass', {
            recordid:this.recordid,
            medicalPercentage: this.medicalPercentage,
            registerPercentage:this.registerPercentage,
            changehospitalList:this.changehospital,
            registerList:this.register,
            billList:this.bill,
            Form :this.Form,
            beizhu:this.beizhu,
            recordmoney:this.recordmoney
          })
          .then(function (res) {
            console.log(res);
            if(res.code == 200) {
              this.$message.success('审核成功')
            } 
          })
        },
        checkback(){
           axios.post('/checkerback', {
            recordid:this.recordid,
            medicalPercentage: this.medicalPercentage,
            registerPercentage:this.registerPercentage,
            beizhu:this.beizhu
          })
          .then(function (res) {
            console.log(res);
            if(res.code == 200) {
              this.$message.success('退回成功')
            } 
          })
        },
        back(){
          this.$router.push({path: '/checker/recording', query:{id:this.usertype}})
        },
        zifeijisuan1(item){
          if(this.showcheck){
            for(let i=0;i<this.register.length;i++){
              console.log("服务自费：",this.register[i].registerCost)  
              this.register[i].zifei= this.register[i].registerCost * this.registerPercentage
              console.log("计算的服务自费：",this.register[i].zifei)
              this.register.splice(i, 1,this.register[i])
            }
          }
        },
        zifeijisuan2(item){
          if(this.showcheck){
            for(let i=0;i<this.bill.length;i++){
              console.log("药费自费：",this.bill[i].billCost)  
              this.bill[i].zifei= this.bill[i].billCost * this.registerPercentage
              console.log("计算的药费自费：",this.bill[i].zifei)
              this.bill.splice(i, 1,this.bill[i])
            }
          }
        },
        recordmoneyjisuan(){
          console.log("报销金额");
          if(this.showcheck){
            this.recordmoney = 0 ;
            for(let i=0;i<this.register.length;i++){
              this.recordmoney += this.register[i].registerCost * (1-this.registerPercentage)
            }
            for(let i=0;i<this.bill.length;i++){
              this.recordmoney += this.bill[i].billCost * (1-this.medicalPercentage)
            }
            console.log("报销金额：",this.recordmoney)
          }  
        },
        backcomplete(){
          this.$router.push({path: '/checker/completecheck'})
        }
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
  }/* ，
  .beizhu{
    margin-left: 100px;
    text-align:center
  } */
</style>