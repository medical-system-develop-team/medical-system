<template>
  <div id = "user" style="height:100%">   
    <el-scrollbar style="height:100%">
      <div style="text-align: center;">
        <h2>报销信息</h2>
        <small>类型:{{message}}</small>
        <el-form ref="form" :model='Percentage' :inline="true"  style="margin-top: 5px;text-align:left;margin-left: 8.5vw;"> 
          <el-form-item  label="医事服务费自负比例：">
            <el-input size="mini" v-model="Percentage.register" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="医药费自负比例：">
            <el-input size="mini"  v-model="Percentage.medical" :readonly="true"></el-input>
          </el-form-item>
        </el-form>
      </div>  
   <!--  <el-container style="height:100%" >
      <el-main>
        <el-scrollbar style="height:100%"> -->
          <div class="referral">
            <div v-for="(item, index) in zhuanzhendan" :key="index+'1'">
              <div class="title1" style="margin-top:10px;">
                <b style="font-size:15px;">转诊单{{index+1}}</b>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true"   label-width="100px"  class="demo-form-inline" >
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
                <b style="font-size:15px;">医事服务费（挂号费）{{index+1}}</b>
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
                  <el-form-item label="自费：">
                    <el-input size="small"  v-model="item.zifei" :readonly="true"></el-input>
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
                <span style="font-size:15px;">医事服务费（挂号费）：</span><br>
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
                  <el-form-item label="自费：">
                    <el-input size="small"  v-model="item.zifei" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="特殊：">
                    <el-input size="small" v-model="item.specialfee" :readonly="true"></el-input>
                  </el-form-item>
                  <el-form-item label="部分：">
                    <el-input size="small"  v-model="item.partfee" :readonly="true"></el-input>
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
                    <el-input size="small" type="textarea" v-model="beizhu" :readonly="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
            <el-form :inline="true" class="demo-form-inline add-form">
              <el-form-item class="btnRight">
                <el-button type="success" size ="mini" icon="view" style="margin-right: 20px;" @click='back()'>返回</el-button>
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
      return {
          id:'',//报销记录编号
          message:'',
          Percentage:{
            register:'',
            medical:'0.2',
          },          
          beizhu:'',
          recording:[],
          usertype:['学生','职工','退休','离休','医照'],
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
          waishangarr:[{}],
          
      }
    },
    created(){
        this.deatils()
      },
    methods: {
        deatils(){
          console.log("test:",this.usertype[0],this.usertype[1]);
          this.id =this.$route.query.id//报销记录编号
          var _this = this
          axios.post('/recdetail',_this.id)
            .then(function (res) {
              console.log(res);
              _this.Percentage = res.Percentage//医事服务费自负比例医药费自负比例
              _this.beizhu = res.beizhu
              _this.zhuanzhendan = res.zhuanzhendan
              _this.yishifuwufei = res.yishifuwufei
              _this.yaofeidanju = res.yaofeidanju
              _this.waishangarr = res.waishangarr
              _this.message = _this.usertype[res.usertype]
            })
            .catch(function (error) {
              console.log(error);
            });

        },
        back(){
          this.$router.push({path: '/Admin/recordmanage/recordcheck'})
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