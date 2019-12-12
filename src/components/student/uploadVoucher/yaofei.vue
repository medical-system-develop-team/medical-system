<template>
  <div class="yaofei">

    <div class="each-item" v-for="(record, index) in localValue" :key="index">
      <h2>医院：{{ record.hosName }}</h2>
      <div v-for="(item, idx) in record.fuwufeiArr" :key="idx">
        <h4>“{{ item.office }}” 科室的药费</h4>
        <!-- <el-divider class="office-yaofei-title" content-position="left">“{{ item.office }}” 科室的药费</el-divider> -->
        <div v-for="(yiyao, i) in item.yaofeiArr" :key="index + idx + i" class="yaofei-item">

          <el-divider content-position="left">
            <span class="yaofei-divider">第 {{i + 1}} 条药费单据记录</span>
          </el-divider>
          <el-button type="text" class="delete-button" @click="deleteARecord(index, idx, i)">删除</el-button>

          <el-form ref="form" class="item-form" :model="yiyao" size="small" label-width="90px" label-position="left">
            <el-form-item label="② 金额" prop="yaofeiPay" :rules="[validateRequiredRule('金额为必填')]">
              <el-input v-model="yiyao.yaofeiPay" type="number" placeholder="请填写金额" />
            </el-form-item>
            <el-form-item label="③ 日期" prop="yaofeiDate" :rules="[validateRequiredRule('日期为必填')]">
              <el-date-picker v-model="yiyao.yaofeiDate" type="date" placeholder="选择日期" />
            </el-form-item>
            <el-form-item label="④ 药费照片" prop="yaofeiImg">
              <el-upload class="img-upload" action="http://localhost:8888/api/UploadImgY" :show-file-list="false" :on-success="handleAvatarSuccess(index, idx, i, 'yaofeiImg')" :before-upload="beforeAvatarUpload">
                <div v-if="yiyao.yaofeiImg" class="img">
                  <el-image :src="yiyao.yaofeiImg" fit="scale-down" />
                </div>
                <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="⑤ 处方照片" prop="chufangImg">
              <el-upload class="img-upload" action="http://localhost:8888/api/UploadImgC" :show-file-list="false" :on-success="handleAvatarSuccess(index, idx, i,  'chufangImg')" :before-upload="beforeAvatarUpload">
                <div v-if="yiyao.chufangImg" class="img">
                  <el-image :src="yiyao.chufangImg" fit="scale-down" />
                </div>
                <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
              </el-upload>
            </el-form-item>
          </el-form>

        </div>

        <el-divider class="add-yaofei" content-position="left">
          <el-button type="text" size="small" @click="newARecord(index, idx)">新增药费单据记录</el-button>
        </el-divider>

      </div>

    </div>

    <div class="button-container">
      <el-button type="primary" size="small" @click="preStep">上一步</el-button>
      <el-button type="primary" size="small" @click="next">下一步</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'yaofei',
  props: {
    preStep: { type: Function, default() { return () => { } } },
    nextStep: { type: Function, default() { return () => { } } },
    value: { type: Array, default() { return [] } }
  },
  model: { prop: 'value', event: 'change' },
  data() {
    return {
      localValue: this.value
    }
  },
  watch: {
    value(val) { this.localValue = val }
  },
  methods: {
    newARecord(index, idx) {
      if (!this.checkForm()) {
        this.$message.error('请填写完整已经添加记录')
        return
      }
      
      this.localValue[index].fuwufeiArr[idx].yaofeiArr.push({
        yaofeiPay: '', // 药费金额
        yaofeiDate: '', // 产生费用的日期
        yaofeiImg: '',
        chufangImg: ''
      })
      this.$emit('change', this.localValue)
    },
    next() {
      this.nextStep()
      // if (!this.checkForm()) return
      // this.nextStep()
    },
    deleteARecord(index, idx, i) {
      this.localValue[index].fuwufeiArr[idx].yaofeiArr.splice(i, 1)
      this.$emit('change', this.localValue)
    },
    handleAvatarSuccess(index, idx, i, key) {
      return (res, file) => {
        this.localValue[index].fuwufeiArr[idx].yaofeiArr[i][key] =URL.createObjectURL(file.raw);
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
    /**
     * 校验当前项的必填
     */
    validateRequiredRule(msg) {
      return { required: true, message: msg, trigger: 'change' }
    },
    /**
     * @desc 返回菜单是否通过校验条件
     */
    checkForm(formValue) {
      let validation = true
      const forms = this.$refs.form
      for (let i = 0; i < forms.length; i++) {
        forms[i].validate((valid) => {
          if (!valid) validation = false
        })
      }
      return validation
    }
  }
}
</script>

<style lang="less" scoped>
.yaofei {
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
    .yaofei-item {
      position: relative;
      margin: 40px 0;
      .yaofei-divider {
        font-size: 12px;
      }
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