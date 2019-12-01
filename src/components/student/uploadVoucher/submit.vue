<template>
<div class="submit">
  <transition name="fade">
    <div class="each-item"  v-if="show">
      <div class="submit-item">
        <el-divider content-position="left">外伤说明</el-divider>
        <el-button type="text" class="delete-button" @click="deleteARecord">删除</el-button>
        
        <!-- <el-form class="item-form" :model="item" size="small" label-width="90px" label-position="left">
          <el-form-item label="① 医院名称">
            <el-input v-model="item.hosName" placeholder="请填写医院名称" />
          </el-form-item>
        </el-form>  -->
      </div>
    </div>
  </transition>
  <div class="button-container">
     <el-button type="primary" size="small" plain @click="newARecord" :disabled="show">添加外伤说明</el-button>
     <el-button type="primary" size="small" @click="save">暂存</el-button>
     <el-button type="primary" size="small" @click="submit">提交</el-button>
     <el-button type="danger" size="small" @click="reset">重置</el-button>
     <el-button type="primary" size="small" @click="preStep">上一步</el-button>

  </div>
</div>
</template>

<script>
import { commonApi } from '../../../api'

export default {
  name: 'submit',
  props: {
    preStep: { type: Function, default() { return () => { } } },
    value: { type: Array, default() { return [] } }
  },
  model: { prop: 'value', event: 'change' },
  data() {
    return {
      localValue: this.value,
      show:false
    }
  },
  watch: {
    value(val) { this.localValue = val }
  },
  methods: {
    newARecord(index) {
      this.show = true,
      this.localValue[index].yaofeiArr.push({ hosName: '', date: null })
      this.$emit('change', this.localValue)
    },
    deleteARecord(index, idx) {
      this.show = false,
      this.localValue[index].yaofeiArr.splice(index, 1)
      this.$emit('change', this.localValue)
    },
    handleAvatarSuccess(index, idx, key) {
      return (res, file) => {
        this.localValue[index].yaofeiArr[idx][key] = URL.createObjectURL(file.raw);
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
    save() {
    },
    submit() {
      const url = 'https://www.fastmock.site/mock/12e9010cbb8f72411985efd3130dbd1b/mediacl/login'
      commonApi(url, this.value).then(res => {
        if (res) this.$message.success(res.msg || '提交成功')
      })
      console.log('%c Groot Log', 'color:red;font-weight:bold', ': submit -> this.value', this.value)
    },
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