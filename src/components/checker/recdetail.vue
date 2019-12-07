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
        <el-form ref="form" :inline="true" style="margin-top: 5px;"> 
          <el-form-item  label="医事服务费自负比例：">
            <el-input size="mini" v-model="registerPercentage"></el-input>
          </el-form-item>
          <el-form-item label="医药费自负比例：">
            <el-input size="mini"  v-model="medicalPercentage"></el-input>
          </el-form-item>
        </el-form>
      </div>  
   <!--  <el-container style="height:100%" >
      <el-main>
        <el-scrollbar style="height:100%"> -->
          <div class="referral">
            <div v-for="(item, index) in zhuanzhendan" :key="index">
              <div class="title1" >
                <span style="font-size:15px;">转诊单{{index+1}}</span>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true"  class="demo-form-inline">
                  <el-form-item label="医院：">
                    <el-input size="small" v-model="item.hospital" placeholder="请输入就诊医院"></el-input>
                  </el-form-item>
                  <el-form-item label="日期：">
                    <el-input size="small"  v-model="item.date" placeholder="请输入就诊日期"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="imageBox" style="margin-top:10px;">
                <b>转诊单：</b><br>
                <img src="item.img" id="previewPresImg" fit="scale-down"  onclick="handleImgSize();" style="width:150px;"><br>
                <el-button type="primary" size="mini" onclick="handleImgDirection();">旋转90°</el-button>
              </div>       
            </div>
              
            <div v-for="(item, index) in yishifuwufei" :key="index">
              <div class="title1" style="margin-top:10px;">
                <span style="font-size:15px;">医事服务费（挂号费）{{index+1}}</span>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true"  class="demo-form-inline">
                  <el-form-item label="医院：">
                    <el-input size="small" v-model="item.hospital"></el-input>
                  </el-form-item>
                  <el-form-item label="科室：">
                    <el-input size="small"  v-model="item.depart"></el-input>
                  </el-form-item>
                  <el-form-item label="金额：">
                    <el-input size="small" v-model="item.fee"></el-input>
                  </el-form-item>
                  <el-form-item label="自费：">
                    <el-input size="small"  v-model="item.zifei"></el-input>
                  </el-form-item>
                  <el-form-item label="日期：">
                    <el-input size="small" v-model="item.date"></el-input>
                  </el-form-item>
                  <el-form-item label="说明：">
                    <el-input size="small"  v-model="item.shuoming"></el-input>
                  </el-form-item>
                </el-form>
              </div> 
              <div class="imageBox" style="margin-top:10px;">
                <b>医事服务费（挂号费）：</b><br>
                <img src="item.img" id="previewPresImg" name="registerImg" class="previewImg" onclick="handleImgSize();" style="width:150px;"><br>
                <el-button type="primary" size="mini" onclick="handleImgDirection();">旋转90°</el-button>
              </div>
            </div>
            
            <div v-for="(item, index) in yaofeidanju" :key="index">
              <div class="title1" style="margin-top:10px;">
                <span style="font-size:15px;">药费单据{{index+1}}</span>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true" class="demo-form-inline">
                  <el-form-item label="医院：">
                    <el-input size="small" v-model="item.hospital"></el-input>
                  </el-form-item>
                  <el-form-item label="科室：">
                    <el-input size="small"  v-model="item.depart"></el-input>
                  </el-form-item>
                  <el-form-item label="金额：">
                    <el-input size="small" v-model="item.fee"></el-input>
                  </el-form-item>
                  <el-form-item label="自费：">
                    <el-input size="small"  v-model="item.zifei"></el-input>
                  </el-form-item>
                  <el-form-item label="特殊：">
                    <el-input size="small" v-model="item.specialfee"></el-input>
                  </el-form-item>
                  <el-form-item label="部分：">
                    <el-input size="small"  v-model="item.partfee"></el-input>
                  </el-form-item>
                  <el-form-item label="日期：">
                    <el-input size="small" v-model="item.date"></el-input>
                  </el-form-item>
                  <el-form-item label="说明：">
                    <el-input size="small"  v-model="item.shuoming"></el-input>
                  </el-form-item>
                </el-form>
              </div> 
              <div class="imageBox" style="margin-top:10px;">
                <b>医事服务费（挂号费）：</b><br>
                <img src="item.img" id="previewPresImg" name="registerImg" class="previewImg" onclick="handleImgSize();" style="width:150px;"><br>
                <el-button type="primary" size="mini" onclick="handleImgDirection();">旋转90°</el-button>
              </div>
            </div>
            <div style="margin-top: 10px;">
              <el-form class="demo-form-inline" label-width="180px">
                <el-form-item  label="备注：" >
                  <el-col :span="18">
                    <el-input 
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容" 
                      v-model="beizhu">
                    </el-input>
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
import { axiospost } from '@/api/index.js'
import axios from 'axios'
  export default {
    data() {
        //sturec:[]
      return {
          id:'',
          usertype:'',
          message:'',
          lasturl:'',
          registerPercentage:'',
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
          yishifuwufei:[{}],
          yaofeidanju:[{}],
      }
    },
    created(){
        this.deatils()
      },
    methods: {
        deatils(){
          this.id =this.$route.query.id//报销记录编号
          this.usertype = this.$route.query.usertype
          this.message = this.$route.query.message
          this.lasturl = this.$route.query.lasturl
          this.showcheck = this.$route.query.showcheck
          this.showcheckcomplete = this.$route.query.showcheckcomplete
          var _this = this
          axiospost('/recdetail',_this.id)
            .then(function (res) {
              console.log(res);
              if(res.zhuanzhendan === 400){
                this.$message.error(res.msg || '查询失败')
                return
              }else{
                _this.zhuanzhendan.puse(res.zhuanzhendan)
                _this.yishifuwufei.puse(res.yishifuwufei)
                _this.yaofeidanju.puse(res.yaofeidanju)
              }
            })
            .catch(function (error) {
              console.log(error);
            });

        },
        checkpass(){
          axios.post('/checkerpass', {
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
          this.$router.push({path: '/checker/recording', query:{id:this.usertype}})
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
  }
</style>