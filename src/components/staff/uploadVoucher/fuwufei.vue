<template>
  <div class="fuwufei">
    <div class="each-item" v-for="(item, index) in localValue" :key="index">
      <el-divider content-position="left">第 {{index + 1}} 条记录</el-divider>
      <el-button type="text" class="delete-button" @click="deleteARecord(index)">删除</el-button>
      <el-form ref="form" class="item-form" :model="item" size="small">
        <el-form-item label="① 医院" prop="hosName" :rules="[validateRequiredRule('医院名称为必填')]">
          <el-select v-model="item.hosName" clearable filterable placeholder="请选择就诊医院">
            <el-option v-for="i in options" :key="i.hname" :value="i.hname"></el-option>
          </el-select>
          <!-- <el-input v-model="item.hosName" type="hosName" placeholder="请填写医院名称" /> -->
        </el-form-item>
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
            <el-upload class="img-upload" action="http://localhost:8888/api/UploadImgF" :show-file-list="false" :on-success="handleAvatarSuccess(index)" :before-upload="beforeAvatarUpload">
              <div v-if="item.yishiImg" class="img">
                <el-image :src="item.yishiImg" fit="scale-down" />
              </div>
              <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
            </el-upload>
          </el-form-item>
      </el-form>
    </div>

    <div class="button-container">
      <el-button type="primary" size="small" plain @click="newARecord">新增医事服务费（挂号费）</el-button>
      <!-- <el-button type="danger" size="small" @click="reset">重置</el-button> -->
      <el-button type="primary" size="small" @click="onNext">下一步</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'fuwufei',
  props: {
    nextStep: { type: Function, default() { return () => { } } },
    value: { type: Array, default() { return [] } }
  },
  model: { prop: 'value', event: 'change' },
  data() {
    return {
      localValue: this.value,
      options: [
        {
          hname: '301'
        }, {
          hname: '302'
        }, {
          hname: '303'
        }, {
          hname: '304'
        },{
          hname: '305'
        }, {
          hname: '306'
        }
      ],
    }
  },
  watch: {
    value(val) { this.localValue = this.value }
  },
  // created() {
  //   const url = '' // gethosName
  //   getHosName(url).then(res => {  // 根据recordID请求数据
  //     if (res.code === 200) {  // 请求成功
  //       this.options = res
  //     }
      
  //   })
  // },
  methods: {
    /**
     * @desc 增加一条服务费记录
     */
     newARecord() {
      if (!this.checkForm(this.localValue)) {
        this.$message.error('请将已经增加的记录填写完整，再新建')
        return
      }
      this.localValue.push({
        hosName: '', //医院，指定范围的医院
        office: '',  // 科室
        yishiPay: '', // 医事服务费（挂号费）金额
        yishiDate: '', // 产生医事服务费的日期
        yishiImg: '', // 医事服务费的单据
        yaofeiArr: [{
          yaofeiPay: '', // 药费金额
          yaofeiDate: '', // 产生费用的日期
          yaofeiImg: '',
          chufangImg: ''
        }]
      })
      this.$emit('change', this.localValue)
    },
    deleteARecord(index) {
      this.localValue.splice(index, 1)
      this.$emit('change', this.localValue)
    },
    handleAvatarSuccess(index) {
      return (res, file) => {
        this.localValue[index].yishiImg = URL.createObjectURL(file.raw);
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
    onNext() {
      this.nextStep()
      // if (this.checkForm(this.localValue)) this.nextStep()
      // else { this.$message.error('填写有误，请检查') }
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
.fuwufei {
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