<template>
  <div class="reimbursement">
  <div class="body" id="pdfDom">
    <h2 class="title">公费医疗（门诊）报销申请单</h2>
    <table class="myTable">
      <tbody>
        <tr>
            <th width="15%">报销号：</th><td width="20%">{{tableData.baoxiaoNum}}</td>
            <th width="10%">报账号：</th><td width="20%">{{tableData.baozhangNum}}</td>
            <!-- <th width="25%" rowspan="3"><img alt="UIBE报销二维码" src="/refundproof/qrcode/61ebfbb94a0f4cb49cadb9f1ada950fc.png"></th> -->
        </tr>
        <tr>
            <th width="15%">姓&nbsp;&nbsp;&nbsp;名：</th><td width="20%">{{tableData.name}}</td>
            <th width="10%">类&nbsp;&nbsp;&nbsp;别：</th><td width="20%">{{tableData.status}}</td>
        </tr>
        <tr>
            <th width="15%">部&nbsp;&nbsp;&nbsp;门：</th><td width="20%">{{tableData.department}}</td>
            <th width="10%">日&nbsp;&nbsp;&nbsp;期：</th><td width="20%">{{tableData.date}}</td>
        </tr>
      </tbody>
    </table>
    <table class="myTable" border>
      <tbody>
        <tr>
            <th width="18%">医事服务费实际花销</th><td width="12.5%">{{tableData.realFuwu}}</td>
            <th width="12.5%">个负比例</th><td width="12.5%">{{tableData.proportion}}<!--0.0--></td>
            <th width="12.5%">个负金额</th><td width="12.5%">{{tableData.gefuPay}}<!-- 0.00 --></td>
            <th width="12.5%">凭证数</th><td width="12.5%">{{tableData.fuwuPingzheng}}</td>
            <!-- <th width="12.5%"><a href="../showRecord/61ebfbb94a0f4cb49cadb9f1ada950fc">凭证数</a></th><td width="12.5%">1</td> -->
        </tr>
        <tr>
            <th width="18%">医事服务费</th><td width="12.5%">{{tableData.fuwuPay}}</td>
            <th width="18%">自费款</th><td width="12.5%">{{tableData.zifeikuan}}</td>
            <th colspan="2">报销金额（大写）</th><td colspan="3">{{tableData.baoxiaoPay}}<!-- 33333.00(叁万叁仟叁佰叁拾叁元整) --></td>
        </tr>
        <tr>
            <th width="18%">医药费申报金额</th><td width="12.5%">{{tableData.yaofeishenbao}}</td>
            <th width="12.5%">个负比例</th><td width="12.5%">{{tableData.yaofeiProportion}}<!-- 0.2 --></td>
            <th width="12.5%">个负金额</th><td width="12.5%">{{tableData.yaofeigefuPay}}<!--4.80--></td>
            <th width="12.5%">凭证数</th><td width="12.5%">{{tableData.yaofeiPingzheng}}</td>
        </tr>
        <tr>
            <th width="18%">特殊负担</th><td width="12.5%">{{tableData.teshuFudan}}</td>
            <th width="12.5%">部分负担</th><td width="12.5%">{{tableData.bufenFudan}}</td>
            <th width="12.5%">自费款</th><td width="12.5%">{{tableData.yaofeiZifeikuan}}</td>
            <th width="12.5%">其他</th><td width="12.5%">{{tableData.other}}</td>
        </tr>
        <tr>
            <th width="18%">就诊医院</th><td colspan="2">{{tableData.hospital}}</td>
            <th colspan="2">报销金额（大写）</th><td colspan="3">{{tableData.yaofeibaoxiaoPay}}<!-- 19.20(壹拾玖元贰角) --></td>	
        </tr>
      </tbody>
    </table>
    <table class="myTable">
      <tbody>
        <tr>
            <th width="20%">财务处审核签章</th><td width="12.5%"></td>
            <th width="30%">公疗办医生审核签章</th><td width="12.5%"></td>
            <th>报销人</th><td width="12.5%"></td>			  	
        </tr>
      </tbody>
    </table>
    </div>
    <div class="button" style="text-align:center; margin-top:20px">
        <el-button size="mini" @click="back">返回</el-button>
        <el-button size="mini" v-on:click="getPdf()">下载PDF</el-button>                                       
    </div>
  </div>
</template>

<script>
import { commonApi } from '@/api/index.js'

export default {
  name: 'reimbursement',
  components: {
    
  },
  data() {
      return {
        recordID: this.$route.params.recordID || null ,
        tableData: {
          baoxiaoNum: '', //报销号
          baozhangNum: '', //报账号 stu2
          name: '',  //姓名
          status: '', //类别
          department: '', //部门
          date: '', //日期

          realFuwu: '', //医事服务费实际花销
          proportion: '', //个负比例
          gefuPay: '',  //个负金额
          fuwuPingzheng: '', //服务费凭证
          fuwuPay: '', //医事服务费
          zifeikuan: '', //自费款
          baoxiaoPay: '', //服务费报销金额

          yaofeishenbao: '', //医药费申报金额
          yaofeiProportion: '', //个负比例
          yaofeigefuPay: '',  //个负金额
          yaofeiPingzheng: '', //药费凭证
          teshuFudan: '', //特殊负担
          bufenFudan: '', //部分负担
          yaofeiZifeikuan: '', //自费款
          other: '', // 其他
          hospital: '', // 就诊医院
          yaofeibaoxiaoPay: '', //报销金额

        },
        htmlTitle: '公费医疗（门诊）报销申请单'
      }
  },
  created() {
    if (!this.recordID) return  
    const url = '/CreateTable' // getreportByID
    commonApi(url, { recordID:this.recordID }).then(res => {  // 根据recordID请求数据
        this.tableData = res
    })
  },
  methods: {
    back(){
    this.$router.push('/myRecords')
    },
  }
}
</script>

<style lang="less">
.reimbursement {
    margin-top: 60px;
}
</style>
