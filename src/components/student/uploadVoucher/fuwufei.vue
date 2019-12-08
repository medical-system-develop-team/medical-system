<template>
  <div class="fuwufei">

    <div class="each-item" v-for="(record, index) in localValue" :key="index">
      <h2>医院：{{ record.hosName }}</h2>

      <div v-for="(item, idx) in record.fuwufeiArr" :key="`${index}-${idx}`" class="fuwufei-item">

        <el-divider content-position="left"> 第 {{idx + 1}} 条医事服务费（挂号费）记录</el-divider>
        <el-button type="text" class="delete-button" @click="deleteARecord(index, idx)">删除</el-button>

        <el-form ref="form" class="item-form" :model="item" size="small" label-width="90px" label-position="left">
          <el-form-item label="② 科室" prop="office" :rules="[validateRequiredRule('科室名称为必填')]">
            <el-input v-model="item.office" placeholder="请填写医院科室" />
          </el-form-item>
          <el-form-item label="③ 金额" prop="yishiPay" :rules="[validateRequiredRule('金额为必填')]">
            <el-input v-model="item.yishiPay" type="number" placeholder="请填写金额" />
          </el-form-item>
          <el-form-item label="④ 日期" prop="yishiDate" :rules="[validateRequiredRule('日期为必填')]">
            <el-date-picker v-model="item.yishiDate" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="⑤ 服务图片" prop="yishiImg">
            <el-upload class="img-upload" action="http://localhost:8888/api/UploadImgF" :show-file-list="false" :on-success="handleAvatarSuccess(index, idx)" :before-upload="beforeAvatarUpload">
              <div v-if="item.yishiImg" class="img">
                <el-image :src="item.yishiImg" fit="scale-down" />
              </div>
              <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
            </el-upload>
          </el-form-item>
        </el-form>

      </div>
      <el-divider content-position="left">
        <el-button type="text" size="small" @click="newARecord(index)">新增服务费记录</el-button>
      </el-divider>
    </div>

    <div class="button-container">
      <el-button type="primary" size="small" @click="preStep">上一步</el-button>
      <el-button type="primary" size="small" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'fuwufei',
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
    /**
     * @desc 增加一条服务费记录
     */
    newARecord(index) {
      if (!this.checkForm(this.localValue)) {
        this.$message.error('请填写完整已经添加记录')
        return
      }
      this.localValue[index].fuwufeiArr.push(
        {
          office: '',  // 科室
          yishiPay: '', // 医事服务费（挂号费）
          yishiDate: '', // 产生医事服务费的日期
          yishiImg: '', // 医事服务费的单据
          yaofeiArr: [{
            yaofeiPay: '', // 药费金额
            yaofeiDate: '', // 产生费用的日期
            yaofeiImg: '',
            chufangImg: ''
          }]
        }
      )
      this.$emit('change', this.localValue)
    },
    next() {
      if (!this.checkForm()) return
      this.nextStep()
    },
    deleteARecord(index, idx) {
      this.localValue[index].fuwufeiArr.splice(idx, 1)
      this.$emit('change', this.localValue)
    },
    handleAvatarSuccess(index, idx) {
      return (res, file) => {
        this.localValue[index].fuwufeiArr[idx].yishiImg = URL.createObjectURL(file.raw);
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
    reset() {
      this.localValue = [{ hsoName: '', date: null, img: '' }]
      this.$emit('change', this.localValue)
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
.fuwufei {
  .each-item {
    margin: 20px 0 40px 0;
    padding: 20px 20px 40px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .delete-button {
      position: absolute;
      right: 20px;
      top: -8px;
      background: #ffffff;
      padding: 0 10px;
    }
    .fuwufei-item {
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