<template>
  <div id = "user" style="height:100%">   
    <el-scrollbar style="height:100%">
      <div style="text-align: center;">
        <h2>报销信息</h2>
        <small>类型:{{message}}</small>
        <el-form ref="form" :inline="true" style="margin-top: 5px;text-align:left;margin-left: 11%;"> 
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
            <div v-for="(item, index) in zhuanzhendan" :key="index+'1'">
              <div class="title1" >
                <b style="font-size:15px;">转诊单{{index+1}}</b>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true"  class="demo-form-inline" style='text-align:left;margin-left: 21%;'>
                  <el-form-item label="医院：">
                    <el-input size="small" v-model="item.hospital" placeholder="请输入就诊医院"></el-input>
                  </el-form-item>
                  <el-form-item label="日期：">
                    <el-input size="small"  v-model="item.date" placeholder="请输入就诊日期"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="imageBox" style="margin-top:10px;">
                <span style="font-size:15px;">转诊单：</span><br>
                <img src="item.img" id="previewPresImg" fit="scale-down"  onclick="handleImgSize();" style="width:150px;"><br>
                <el-button type="primary" size="mini" onclick="handleImgDirection();">旋转90°</el-button>
              </div>       
            </div>
              
            <div v-for="(item, index) in yishifuwufei" :key="index+'2'">
              <div class="title1" style="margin-top:10px;">
                <b style="font-size:15px;">医事服务费（挂号费）{{index+1}}</b>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true"  class="demo-form-inline" style='text-align:left;margin-left: 10%;'>
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
                <span style="font-size:15px;">医事服务费（挂号费）：</span><br>
                <img src="item.img" id="previewPresImg" name="registerImg" class="previewImg" onclick="handleImgSize();" style="width:150px;"><br>
                <el-button type="primary" size="mini" onclick="handleImgDirection();">旋转90°</el-button>
              </div>
            </div>
            
            <div v-for="(item, index) in yaofeidanju" :key="index+'3'">
              <div class="title1" style="margin-top:10px;">
                <b style="font-size:15px;">药费单据{{index+1}}</b>
              </div>
              <div class="content" style="margin-top:10px;">
                <el-form ref="form" :inline="true" class="demo-form-inline" style='text-align:left;margin-left: 10%;'>
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
                <span style="font-size:15px;">医事服务费（挂号费）：</span><br>
                <img src="item.img" id="previewPresImg" name="registerImg" class="previewImg" onclick="handleImgSize();" style="width:150px;"><br>
                <el-button type="primary" size="mini" onclick="handleImgDirection();">旋转90°</el-button>
              </div>
            </div>
            <div style="margin-top: 10px;">
              <el-form label-width="100px" style="margin-left: 5%;">
                <el-form-item label="备注：">
                  <el-col :span="18">
                    <el-input size="small" type="textarea" v-model="beizhu"></el-input>
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
          registerPercentage:'',
          medicalPercentage:'0.2',
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
              _this.registerPercentage = res.registerPercentage//医事服务费自负比例
              _this.medicalPercentage = res.medicalPercentage//医药费自负比例
              _this.beizhu = res.beizhu
              _this.zhuanzhendan = res.zhuanzhendan
              _this.yishifuwufei = res.yishifuwufei
              _this.yaofeidanju = res.yaofeidanju
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