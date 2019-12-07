<template>
  <div class="zhuanzhendan">

    <div class="each-item" v-for="(item, index) in localValue" :key="index">
      <el-divider content-position="left">第 {{index + 1}} 条记录</el-divider>
      <el-button type="text" class="delete-button" @click="deleteARecord(index)">删除</el-button>
      <el-form ref="form" class="item-form" :model="item" size="small">
        <el-form-item label="① 医院名称" prop="hosName" :rules="[validateRequiredRule('医院名称为必填')]">
          <el-input v-model="item.hosName" type="hosName" placeholder="请填写医院名称" />
        </el-form-item>
        <el-form-item label="② 转诊日期" prop="zhuanzhenDate" :rules="[validateRequiredRule('转诊日期为必填')]">
          <el-date-picker v-model="item.zhuanzhenDate" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="③ 上传转诊单照片" prop="zhuangzhenImg">
        <!-- <el-form-item label="③ 上传转诊单照片" prop="img" :rules="[validateRequiredRule('转诊照片必填')]"> -->
          <!-- action是上传到后台的地址-->
          <el-upload class="img-upload" type="img" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess(index)" :before-upload="beforeAvatarUpload">
            <div v-if="item.zhuangzhenImg" class="img">
              <el-image :src="item.zhuangzhenImg" fit="scale-down" />
            </div>
            <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <div class="button-container">
      <el-button type="primary" size="small" plain @click="newARecord">新增转诊单</el-button>
      <!-- <el-button type="danger" size="small" @click="reset">重置</el-button> -->
      <el-button type="primary" size="small" @click="onNext">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zhuanzhendan',
  components: {},
  model: { props: 'value', event: 'change' },
  props: {
    value: { type: Array, default() { return [{}] } },
    nextStep: { type: Function, default() { return () => { } } }
  },
  data() {
    return {
      localValue: this.value,
      validateHosName: [{ rquired: true, message: '医院名称为必填' }],
    }
  },
  watch: {
    value(val) { this.localValue = this.value }
  },
  methods: {
    newARecord() {
      if (!this.checkForm(this.localValue)) {
        this.$message.error('请将已经增加的记录填写完整，再新建')
        return
      }
      this.localValue.push({
        hosName: '',
        zhuanzhenDate: null, // 转诊日期
        zhuangzhenImg: '', // 转诊照片
        fuwufeiArr: [{
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
        }],
      })
      this.$emit('change', this.localValue)
    },
    deleteARecord(index) {
      this.localValue.splice(index, 1)
      this.$emit('change', this.localValue)
    },
    handleAvatarSuccess(index) {
      return (res, file) => {
        this.localValue[index].zhuangzhenImg = URL.createObjectURL(file.raw);
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
    validateRequiredRule(msg) {
      return { required: true, message: msg, trigger: 'change' }
    },
    onNext() {
      if (this.checkForm(this.localValue)) this.nextStep()
      else { this.$message.error('填写有误，请检查') }
    },
    reset() {
      this.localValue = [{ hsoName: '', date: null, img: '' }]
      this.$emit('change', this.localValue)
    },
    /**
     * @desc 返回菜单是否通过校验条件
     */
    checkForm(formValue) {
      let validation = true
      const _this = this
      for (let i = 0; i < formValue.length; i++) {
        _this.$refs['form'][i].validate((valid) => {
          if (!valid) validation = false
        })
      }
      return validation
    }
  }
}
</script>

<style lang="less" scoped>
.zhuanzhendan {
  .each-item {
    padding: 20px 20px 40px 20px;
    margin: 20px 0 40px 0;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: left;
    .delete-button {
      position: absolute;
      right: 20px;
      top: -8px;
      background: #ffffff;
      padding: 0 10px;
    }
    .img-upload {
      width: 100%;
      font-size: 30px;
      margin-top: 40px;
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