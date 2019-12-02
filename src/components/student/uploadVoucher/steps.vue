<template>
  <div class="steps-container">
    <el-steps class="steps" :active="active">
      <el-step title="转诊单"></el-step>
      <el-step title="医事服务费（挂号费）"></el-step>
      <el-step title="药费单据"></el-step>
      <el-step title="提交"></el-step>
    </el-steps>

    <!-- <div class="steps-button">
      <el-button class="prev" type="text" icon="el-icon-arrow-left" @click="prev">上一步</el-button>
      <el-button class="next" type="text" @click="next">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div> -->

    <div class="step-component">
      <zhuanzhendan v-model="recordArr" :next-step="next" v-if="active === 1" />
      <fuwufei v-model="recordArr" :next-step="next" :pre-step="prev" v-if="active === 2" />
      <yaofei v-model="recordArr" :next-step="next" :pre-step="prev" v-if="active === 3" />
      <submit v-model="recordArr" :next-step="next" :pre-step="prev" v-if="active === 4" />
    </div>

  </div>
</template>

<script>
import zhuanzhendan from '@/components/student/uploadVoucher/zhuanzhendan.vue'
import fuwufei from '@/components/student/uploadVoucher/fuwufei.vue'
import yaofei from '@/components/student/uploadVoucher/yaofei.vue'
import submit from '@/components/student/uploadVoucher/submit.vue'

export default {
  components: {
    zhuanzhendan, fuwufei, yaofei, submit
  },
  data() {
    return {
      active: 1,
      recordArr: [
        {
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
          }]
        }
      ],
      zhuanzhendanArr: [{ hosName: '', date: null, img: '' }],
      fuwufeiArr: [{ hosName: '', office: '', date: null, pay: '', img: '' }],
      yaofeiArr: [{ hosName: '', date: '', pay: '', yaofeiImg: '', chufangImg: '' }],
      //submitArr: [{ hosName: '', waishangshuoming: '', gaizhangImg: '', teshuyongyaoImg: '' }]
    }
  },
  watch: {
    zhuanzhendanArr(val) {
      this.syncArr(this.zhuanzhendanArr, this.fuwufeiArr, this.yaofeiArr, 'hosName')
    }
  },
  methods: {
    prev() {
      if (this.active-- <= 1) this.active = 1;
    },
    next() {
      if (this.active++ > 3) this.active = 4;
    },
    syncArr(from, to1, to2, key) {
      from.forEach((item, index) => {
        to1[index][key] = item[key]
        to2[index][key] = item[key]
      })
    }
  }
}
</script>

<style lang="less">
.steps-container {
  margin: 60px auto 60px auto;
  max-width: 800px;
  min-width: 500px;
  overflow: scroll;
  text-align: left;
  .step-component {
    margin: 40px 20px;
  }
  .steps,
  .steps-button {
    padding: 5px 20px 0 20px;
  }
  .next {
    float: right;
  }
  .steps {
    .el-step__line {
      width: 110%;
    }
    .el-step.is-horizontal.is-flex {
      text-align: right;
    }
  }
}
</style>
