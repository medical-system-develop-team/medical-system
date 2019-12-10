<template>
  <div class="submit">
    <transition name="fade">
      <div class="each-item" v-if="hasAddWaishangshuoming">
        <div class="submit-item">
          <el-divider content-position="left">外伤说明</el-divider>
          <el-button type="text" class="delete-button" @click="deleteWaishangshuoming">删除</el-button>
          <el-form class="item-form" size="small">
            <el-form-item label="① 描述">
              <el-input type="textarea" v-model="waishangArr.waishangshuoming" placeholder="请输入受伤经过、时间、原因、地点" />
            </el-form-item>
            <el-form-item label="② 辅导员签字、学院盖章证明">
              <el-upload class="img-upload" action="http://localhost:8888/api/UploadImgG" :show-file-list="false" :on-success="handleAvatarSuccess('gaizhangImg')" :before-upload="beforeAvatarUpload">
                <div v-if="waishangArr.gaizhangImg" class="img">
                  <el-image :src="waishangArr.gaizhangImg" fit="scale-down" />
                </div>
                <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="③ 特殊用药说明">
              <el-upload class="img-upload" action="http://localhost:8888/api/UploadImgT" :show-file-list="false" :on-success="handleAvatarSuccess('teshuImg')" :before-upload="beforeAvatarUpload">
                <div v-if="waishangArr.teshuImg" class="img">
                  <el-image :src="waishangArr.teshuImg" fit="scale-down" />
                </div>
                <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
              </el-upload>
            </el-form-item>
          </el-form>     
        </div>
        <p style="color: red">注：外伤说明提交一次即可！</p>  
      </div>
    </transition>
    <div class="button-container">
      <el-button v-if="!hasAddWaishangshuoming" type="primary" size="small" plain @click="addWaishangshuoming">添加外伤说明</el-button>
      <el-button type="primary" size="small" @click="save">暂存</el-button>
      <el-button type="primary" size="small" @click="submit">提交</el-button>
      <el-button type="danger" size="small" v-if="hasAddWaishangshuoming" @click="reset">重置</el-button>
      <el-button type="primary" size="small" @click="preStep">上一步</el-button>
    </div>
  </div>
</template>

<script>
import { commonApi } from '@/api/index.js'

export default {
  name: 'submit',
  props: {
    preStep: { type: Function, default() { return () => { } } },
    value: { type: Array, default() { return [] } },
    wssm: { type: Array, default() { return [] } }
  },
  model: { prop: 'value', event: 'change' },
  data() {
    return {
      hasAddWaishangshuoming: this.wssm.waishangshuoming ? true : false,
      //hasAddWaishangshuoming: false,
      waishangArr: {
          waishangshuoming: this.wssm.waishangshuoming || null,
          gaizhangImg: this.wssm.gaizhangImg || null,
          teshuImg: this.wssm.teshuImg || null,
      },
      localValue: this.value
    }
  },
  watch: { // 监听
    value(val) { this.localValue = val }
  },
  methods: {
    handleAvatarSuccess(key) {
      return (res, file) => {
        this.waishangArr[key] = URL.createObjectURL(file.raw);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    addWaishangshuoming() {
      this.hasAddWaishangshuoming = true
      this.waishangArr = { waishangshuoming: '', gaizhangImg: '', teshuImg: ''}
    },
    deleteWaishangshuoming() {
      this.hasAddWaishangshuoming = false
      this.waishangArr = null
    },
    reset() {
      this.waishangArr = null
    },
    save() {
      console.log('最终记录为: \n', this.getParam())
      const url = '/TemporaryUpload' // 此处为暂存的路径
      commonApi(url, this.getParam()).then(res => {
        if (res.code === 200) { 
          this.$message.success('提交成功')
          this.$router.push('/stdhome')
        }
        else if (res.code  === 400) { 
          this.$message.error(res.code || '提交失败')
        }
      })
    },
    submit() {
      console.log('最终记录为: \n', this.getParam())
      const url = '/Upload'
      commonApi(url, this.getParam()).then(res => {
        if (res.code === 200) { 
          this.$message.success('提交成功')
          this.$router.push('/stdhome')
        }
        else if (res.code  === 400) { 
          this.$message.error(res.code || '提交失败')
        }
      })
    },
    /**
     * @desc 获取最终要提交给后台的参数
     */
    getParam() {
      const param = {
        records: [...this.value],
        waishangArr: this.waishangArr
      }
      return param
    }
  }
}
</script>

<style lang="less" scoped>
.submit {
  .each-item {
    padding: 20px 20px 40px 20px;
    margin: 20px 0 40px 0;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .delete-button {
      position: absolute;
      right: 20px;
      top: -8px;
      background: #ffffff;
      padding: 0 10px;
    }
    .submit-item {
      position: relative;
      margin: 40px 0;
    }
    .img-upload {
      width: 100%;
      position: relative;
      text-align: left;
      left: -0px;
      .img {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
    }
  }
  .button-container {
    text-align: left;
  }
  .item-form {
    margin-top: 40px;
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>