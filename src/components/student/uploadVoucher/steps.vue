<template>
<div class="steps">
    <el-container class="el-container" direction="vertical">
        <el-header class='el-header'>  
            <el-steps :active="active" align-center>
                <el-step title="转诊单"></el-step>
                <el-step title="医事服务费（挂号费）"></el-step>
                <el-step title="药费单据"></el-step>  
            </el-steps>
        </el-header>

        <el-main class="el-main">
          <keep-alive>
            <component v-bind:is="currentView"></component>
          </keep-alive>        
         </el-main>

        <el-footer class="el-footer">
                <el-button class="prev"  type="text" icon="el-icon-arrow-left" @click="prev">Prev</el-button>
                <el-button class="next"  type="text" @click="next">Next<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-footer>
    </el-container>
</div>
</template>

<script>
import zhuanzhendan from '@/components/student/uploadVoucher/zhuanzhendan.vue'
import fuwufei from '@/components/student/uploadVoucher/fuwufei.vue'
import yaofei from '@/components/student/uploadVoucher/yaofei.vue'

  export default {
    el: '#steps',
    components: {
      zhuanzhendan,fuwufei,yaofei
    },
    data() {
      return {
        active: 1,
        arr:['zhuanzhendan','fuwufei','yaofei'],
      };
    },
    computed:{
      currentView(){
          return this.arr[this.active-1];
      }
    },
    methods: {
      prev() {
        if (this.active-- <= 1) this.active = 1;
      },
      next() {
        if (this.active++ > 2) this.active = 3;
      }
    }
  }
</script>

<style lang="less" scoped>
.steps {
  height: calc(100vh - 70px); 
}
.el-container {
  height:100%;
  min-height: calc(100vh - 70px);  
}
.el-main {
  
}
.el-header {
  margin-top: 35px;
  margin-bottom: 20px;
}
.el-footer {
  background-color:#F2F6FC;
  line-height: 30px;
  bottom: 0px;
}
.prev {
    float: left;
}
.next {
    float: right
}
</style>
