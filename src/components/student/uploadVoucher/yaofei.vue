<template>
  <div class="yaofei">

    <div class="each-item" v-for="(record, index) in localValue" :key="index">
      <h2>{{ record.hosName }}</h2>
      <div v-for="(item, idx) in record.yaofeiArr" :key="idx" class="yaofei-item">
        <el-divider content-position="left">第 {{idx + 1}} 条药费单据记录</el-divider>
        <el-button type="text" class="delete-button" @click="deleteARecord(index, idx)" v-if="idx !== 0">删除</el-button>
        <el-form :ref="`${index}form`" class="item-form" :model="item" size="small" label-width="90px" label-position="left">
          <!-- <el-form-item label="① 医院名称">
            <el-input v-model="item.hosName" placeholder="请填写医院名称" />
          </el-form-item> -->
          <el-form-item label="② 金额">
            <el-input v-model="item.pay" placeholder="请填写金额" />
          </el-form-item>
          <el-form-item label="③ 日期">
            <el-date-picker v-model="item.date" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="④ 药费照片">
            <el-upload class="img-upload" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess(index, idx, 'yaofeiImg')" :before-upload="beforeAvatarUpload">
              <div v-if="item.img" class="img">
                <el-image :src="item.yaofeiImg" fit="scale-down" />
              </div>
              <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="⑤ 处方照片">
            <el-upload class="img-upload" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess(index, idx, 'chufangImg')" :before-upload="beforeAvatarUpload">
              <div v-if="item.img" class="img">
                <el-image :src="item.chufangImg" fit="scale-down" />
              </div>
              <el-button v-else type="text"><i class="el-icon-plus avatar-uploader-icon" />点击上传图片</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <el-divider content-position="left">
        <el-button type="text" size="small" @click="newARecord(index)">新增药费单据记录</el-button>
      </el-divider>
    </div>

    <div class="button-container">
      <el-button type="primary" size="small" @click="preStep">上一步</el-button>
      <el-button type="primary" size="small" @click="nextStep">下一步</el-button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

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
    newARecord(index) {
      this.localValue[index].yaofeiArr.push({ hosName: '', date: null })
      this.$emit('change', this.localValue)
    },
    deleteARecord(index, idx) {
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