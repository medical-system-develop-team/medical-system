<template>
  <div id = "user" style="height:100%">   
    <el-scrollbar style="height:100%">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: this.lasturl }">{{recordtype}}审核列表</el-breadcrumb-item>
          <el-breadcrumb-item>报销详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="text-align: center;">
        <h2>审核报销凭证</h2>
        <small>类型:{{message}}</small>
        <el-form ref="form" :inline="true" style="margin-top: 5px;text-align:left;margin-left: 6.5vw;"> 
          <el-form-item  label="医事服务费自负比例：">
            <el-input size="mini" v-model="registerPercentage" :readonly=showcheckcomplete></el-input>
          </el-form-item>
          <el-form-item label="医药费自负比例：">
            <el-input size="mini"  v-model="medicalPercentage" :readonly=showcheckcomplete></el-input>
          </el-form-item>
        </el-form>
      </div>  
   <!--  <el-container style="height:100%" >
      <el-main>
        <el-scrollbar style="height:100%"> -->
          <div class="referral">
            <div v-for="(item, index) in zhuanzhendan" :key="index+'1'">
              <div class="title1" style="margin-top:10px;" >
                <b style="font-size:15px;">转诊单{{index+1}}</b>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true"  label-width="100px" class="demo-form-inline">
                  <el-form-item label="医院：">
                    <el-input size="small" v-model="item.hospital" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="日期：">
                    <el-input size="small"  v-model="item.date" :readonly="true"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="imageBox" style="margin-top:10px;">
                <span style="font-size:15px;">转诊单：</span><br>
                <img src="item.img" id="previewPresImg" fit="scale-down"  onclick="handleImgSize();" style="width:150px;"><br>
                <el-button type="primary" size="mini" style="margin-top:10px;" onclick="handleImgDirection();">旋转90°</el-button>
              </div>       
            </div>
              
            <div v-for="(item, index) in yishifuwufei" :key="index+'2'">
              <div class="title1" style="margin-top:10px;">
                <b style="font-size:15px;">医事服务费(挂号费){{index+1}}</b>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true"  label-width="100px" class="demo-form-inline" style='text-align:left;'>
                  <el-form-item label="医院：">
                    <el-input size="small" v-model="item.hospital" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="科室：">
                    <el-input size="small"  v-model="item.depart" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="金额：">
                    <el-input size="small" v-model="item.fee" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="自费：" v-if="showcheckcomplete">
                    <el-input size="small"  v-model="item.zifei" :readonly=showcheckcomplete></el-input>
                  </el-form-item>
                  <el-form-item label="自费：" v-if="showcheck">
                    <el-input size="small"  v-model="fuwuzifei" @focus="zifeijisuan1(item)" :readonly=showcheckcomplete></el-input>
                  </el-form-item>
                  <el-form-item label="日期：">
                    <el-input size="small" v-model="item.date" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="说明：">
                    <el-input size="small"  v-model="item.shuoming" :readonly="true"></el-input>
                  </el-form-item>
                </el-form>
              </div> 
              <div class="imageBox" style="margin-top:10px;">
                <span style="font-size:15px;">医事服务费(挂号费)：</span><br>
                <img src="item.img" id="previewPresImg" name="registerImg" class="previewImg" onclick="handleImgSize();" style="width:150px;"><br>
                <el-button type="primary" size="mini" style="margin-top:10px;" onclick="handleImgDirection();">旋转90°</el-button>
              </div>
            </div>
            
            <div v-for="(item, index) in yaofeidanju" :key="index+'3'">
              <div class="title1" style="margin-top:10px;">
                <b style="font-size:15px;">药费单据{{index+1}}</b>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true" label-width="100px" class="demo-form-inline" style='text-align:left;'>
                  <el-form-item label="医院：">
                    <el-input size="small" v-model="item.hospital" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="科室：">
                    <el-input size="small"  v-model="item.depart" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="金额：">
                    <el-input size="small" v-model="item.fee" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="自费负担：" v-if="showcheckcomplete">
                    <el-input size="small"  v-model="item.zifei" :readonly=showcheckcomplete></el-input>
                  </el-form-item>
                  <el-form-item label="自费负担：" v-if="showcheck">
                    <el-input size="small"  v-model="yaozifei" @focus="zifeijisuan2(item)" :readonly=showcheckcomplete></el-input>
                  </el-form-item>
                  <el-form-item label="特殊负担：">
                    <el-input size="small" v-model="item.specialfee" :readonly=showcheckcomplete></el-input>
                  </el-form-item>
                  <el-form-item label="部分负担：">
                    <el-input size="small"  v-model="item.partfee" :readonly=showcheckcomplete></el-input>
                  </el-form-item>
                  <el-form-item label="日期：">
                    <el-input size="small" v-model="item.date" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="说明：">
                    <el-input size="small"  v-model="item.shuoming" :readonly="true"></el-input>
                  </el-form-item>
                </el-form>
              </div> 
              <div class="imageBox" style="margin-top:10px;">
                <span style="font-size:15px;">药费单据：</span><br>
                <el-image 
                  style="width: 100px; height: 100px"
                  :src='url1' 
                  :preview-src-list='srcList'>
                </el-image><br>
                <el-button type="primary" size="mini" style="margin-top: 10px;margin-buttom: 10px;" onclick="handleImgDirection();">旋转90°</el-button><br>
                <span style="font-size:15px;">处方：</span><br>
                <el-image 
                  style="width: 100px; height: 100px;"
                  :src='url2' 
                  :preview-src-list='srcList'>
                </el-image><br>
                <el-button type="primary" size="mini" style="margin-top: 10px;" onclick="handleImgDirection();">旋转90°</el-button>
              </div>
            </div>

            <div style="margin-top: 10px;">
              <el-form label-width="100px" style='text-align:left;'>              
                <el-form-item  label="外伤说明："> 
                  <el-col :span="18"> 
                    <el-input 
                      type="textarea"
                      :rows="2"
                      v-model="waishangarr.waishangshuoming" 
                      :readonly=true>
                    </el-input>
                  </el-col>  
                </el-form-item>              
              </el-form>
              <div class="imageBox" style="margin-top:10px;">
                <span style="font-size:15px;">签字盖章证明：</span><br>
                <el-image 
                  style="width: 100px; height: 100px"
                  :src='url1' 
                  :preview-src-list='srcList'>
                </el-image><br>
                <el-button type="primary" size="mini" style="margin-top: 10px;margin-buttom: 10px;" onclick="handleImgDirection();">旋转90°</el-button><br>
                <span style="font-size:15px;">特殊用药说明：</span><br>
                <el-image 
                  style="width: 100px; height: 100px;"
                  :src='url2' 
                  :preview-src-list='srcList'>
                </el-image><br>
                <el-button type="primary" size="mini" style="margin-top: 10px;" onclick="handleImgDirection();">旋转90°</el-button>
              </div>
            </div>

            <div style="margin-top: 10px;">
              <el-form label-width="100px" style='text-align:left;'>
                <el-form-item label="备注：">
                  <el-col :span="18">
                    <el-input  type="textarea" placeholder="请输入内容" v-model="beizhu" :readonly=showcheckcomplete></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
            <el-form :inline="true" class="demo-form-inline add-form" v-if="showcheck">
              <el-form-item class="btnRight">
                <el-button type="success" size ="mini" icon="view" style="margin-right: 20px;" @click='back()'>返回列表</el-button>
                <el-button type="warning" size ="mini" icon="view" @click="checkpass();">审核完成</el-button>
                <el-button type="danger" size ="mini" icon="view" @click="checkback();">审核退回</el-button>
              </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline add-form" v-if="showcheckcomplete">
              <el-form-item class="btnRight">
                <el-button type="danger" size ="mini" icon="view" @click="recheck();">重新审核</el-button>
                <el-button type="success" size ="mini" icon="view" style="margin-right: 20px;" @click='backcomplete()'>返回列表</el-button>
              </el-form-item>
            </el-form>
          </div>
       <!--  </el-scrollbar>
      </el-main>
      <el-footer> -->
        
      <!-- </el-footer>
    </el-container>  -->
    </el-scrollbar>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
        //sturec:[]
      return {
          id:'',
          usertype:'',
          fuwuzifei:'10',
          yaozifei:'10',
          recordtype:'',
          lasturl:'',
          message:'',
          usertypemessage:['学生','职工','退休','离休','医照'],
          registerPercentage:'0.2',
          medicalPercentage:'0.2',
          beizhu:'',
          showcheck:true,
          showcheckcomplete:false,
          recording:[],
          zhuanzhendan:[
            {
            hospital:'111',
            date:'2019.10.21',
            pic:''
            },
            {
            hospital:'222',
            date:'2019.10.21',
            pic:''
            }
          ],
          yishifuwufei:[{fee:'100',zifei:'123'}],
          yaofeidanju:[{fee:'100',zifei:'123'}],
          waishangarr:[{}]
      }
    },
    created(){
        this.deatils()
      },
    methods: {
        deatils(){
          this.id =this.$route.query.id//报销记录编号
          this.recordtype=this.$route.query.recordtype
          this.lasturl=this.$route.query.lasturl
          this.showcheck = this.$route.query.showcheck
          this.showcheckcomplete = this.$route.query.showcheckcomplete
          var _this = this
          axios.post('/recdetail',_this.id)
            .then(function (res) {
              console.log(res);
              _this.registerPercentage = res.registerPercentage//医事服务费自负比例
              _this.medicalPercentage = res.medicalPercentage//医药费自负比例
              _this.beizhu = res.beizhu
              _this.zhuanzhendan = res.zhuanzhendan
              _this.yishifuwufei = res.yishifuwufei
              _this.yaofeidanju = res.yaofeidanju
              _this.waishangarr = res.waishangarr
              _this.message = _this.usertypemessage[res.usertype]
            })
            .catch(function (error) {
              console.log(error);
            });

        },
        checkpass(){
          axios.post('/checkerAdminpass', {
            medicalPercentage: this.medicalPercentage,
            registerPercentage:this.registerPercentage,
            beizhu:this.beizhu
          })
          .then(function (res) {
            console.log(res);
            if(res.code == 1) {
              this.$message.success('审核成功')
            } 
          })
        },
        checkback(){
           axios.post('/checkerback', {
            medicalPercentage: this.medicalPercentage,
            registerPercentage:this.registerPercentage,
            beizhu:this.beizhu
          })
          .then(function (res) {
            console.log(res);
            if(res.code == 1) {
              this.$message.success('退回成功')
            } 
          })
        },
        back(){
          this.$router.push({path: '/checkerAdmin/recording'})
        },
        recheck(){
          axios.post('/rechecker', {
            medicalPercentage: this.medicalPercentage,
            registerPercentage:this.registerPercentage,
            beizhu:this.beizhu
          })
          .then(function (res) {
            console.log(res);
            if(res.code == 1) {
              this.$message.success('重新审核退回成功')
            } 
          })
        },
        zifeijisuan1(item){
          console.log("fuwuzifei");
          if(this.showcheck){
            this.fuwuzifei = item.fee * this.registerPercentage
          }
          console.log("fuwuzifei",this.fuwuzifei);
        },
        zifeijisuan2(item){
          console.log("yaofeizifei");
          if(this.showcheck){
            this.yaozifei = item.fee * this.medicalPercentage
          }
          
          console.log("yaofeizifei",this.yaozifei);
        },
        backcomplete(){
          this.$router.push({path: '/checkerAdmin/completecheck'})
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
  }
</style>