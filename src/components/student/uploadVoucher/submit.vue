<template>
  <div class="submit">
    <transition name="fade">
      <div class="each-item" v-if="hasAddWaishangshuoming">
        <div class="submit-item">
          <el-divider content-position="left">外伤说明</el-divider>
          <el-button type="text" class="delete-button" @click="deleteWaishangshuoming">删除</el-button>
          <el-input type="textarea" v-model="waishangshuoming" placeholder="请输入外伤说明" />
        </div>
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
      hasAddWaishangshuoming: false,
      waishangshuoming: null,
      localValue: this.value
    }
  },
  watch: {
    value(val) { this.localValue = val }
  },
  methods: {
    addWaishangshuoming() {
      this.hasAddWaishangshuoming = true
    },
    deleteWaishangshuoming() {
      this.hasAddWaishangshuoming = false
      this.waishangshuoming = null
    },
    reset() {
      this.waishangshuoming = null
    },
    save() {
      console.log('最终记录为: \n', this.getParam())
    },
    submit() {
      console.log('最终记录为: \n', this.getParam())
      const url = 'https://www.fastmock.site/mock/12e9010cbb8f72411985efd3130dbd1b/mediacl/login'
      commonApi(url, this.value).then(res => {
        if (res) { 
          this.$message.success(res.msg || '提交成功')
          this.$router.push('/stdhome')
        }
      })
    },
    /**
     * @desc 获取最终要提交给后台的参数
     */
    getParam() {
      const param = {
        records: [...this.value],
        waishangshuoming: this.waishangshuoming
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