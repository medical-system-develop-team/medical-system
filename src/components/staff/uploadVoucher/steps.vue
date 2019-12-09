<template>
  <div class="steps-container">
    <el-steps class="steps" :active="active">
      <el-step title="医事服务费（挂号费）"></el-step>
      <el-step title="药费单据"></el-step>
      <el-step title="提交"></el-step>
    </el-steps>

    <!-- <div class="steps-button">
      <el-button class="prev" type="text" icon="el-icon-arrow-left" @click="prev">上一步</el-button>
      <el-button class="next" type="text" @click="next">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div> -->

    <div class="step-component">
      <fuwufei v-model="recordArr" :next-step="next" v-if="active === 1" />
      <yaofei v-model="recordArr" :next-step="next" :pre-step="prev" v-if="active === 2" />
      <submit v-model="recordArr" :wssm="waishangArr" :next-step="next" :pre-step="prev" v-if="active === 3" />
    </div>

  </div>
</template>

<script>
import { commonApi } from '@/api/index.js'

import fuwufei from '@/components/staff/uploadVoucher/fuwufei.vue'
import yaofei from '@/components/staff/uploadVoucher/yaofei.vue'
import submit from '@/components/staff/uploadVoucher/submit.vue'

export default {
  components: {
    fuwufei, yaofei, submit
  },
  props: {
    recordId: { type: String, default: null }
  },
  data() {
    return {
      active: 1,
      recordArr: [
        {
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
        }
      ],
      waishangArr: {
          waishangshuoming: '',
          gaizhangImg: '',
          teshuImg: '',
      },
      //zhuanzhendanArr: [{ hosName: '', zhuanzhenDate: null, zhuangzhenImg: '' }],
      fuwufeiArr: [{ hosName: '', office: '', yishiDate: null, yishiPay: '', yishiImg: '' }],
      yaofeiArr: [{ hosName: '', yaofeiDate: '', yaofeiPay: '', yaofeiImg: '', chufangImg: '' }],
      //submitArr: [{ hosName: '', waishangshuoming: '', gaizhangImg: '', teshuyongyaoImg: '' }]
    }
  },
  created() {
    //非报销记录列表页面编辑跳转，页面不用渲染
    if (!this.recordId) return  
    //报销记录列表页面编辑跳转，给报销记录赋值
    const url = '' // getRecordByID
    commonApi(url, { recordID: this.recordId }).then(res => {  // 根据recordID请求数据
      if (res.code === 200) {  // 请求成功
        this.recordArr = res.recordArr
        this.waishangArr = res.waishangArr
      }
      
    })
  },
  watch: {
    fuwufeiArr(val) {
      this.syncArr(this.fuwufeiArr, this.yaofeiArr, 'hosName')
    }
  },
  methods: {
    prev() {
      if (this.active-- <= 1) this.active = 1;
    },
    next() {
      if (this.active++ > 2) this.active = 3;
    },
    syncArr(from, to1, key) {
      from.forEach((item, index) => {
        to1[index][key] = item[key]
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
  // overflow: scroll;
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
      width: 105%;
    }
    .el-step.is-horizontal.is-flex {
      text-align: right;
    }
  }
}
</style>
