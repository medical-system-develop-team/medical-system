<template>
<div class="steps">
    <el-container>
        <el-header>
            <el-steps :active="active" align-center>
                <el-step title="转诊单"></el-step>
                <el-step title="医事服务费（挂号费）"></el-step>
                <el-step title="药费单据"></el-step>  
            </el-steps>
        </el-header>

        <el-main>
            Main
        </el-main>

        <el-footer class="stepsbutton">
                <el-button class="prev"  type="text" icon="el-icon-arrow-left" @click="prev">Prev</el-button>
                <el-button class="next"  type="text" @click="next">Next<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-footer>
    </el-container>
</div>
</template>

<script>
  export default {
    data() {
      return {
        active: 1
      };
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
    margin-top: 50px;
    margin-bottom: 50px
}
.stepsbutton {
    background-color:#F2F6FC;
    position: fixed;
    bottom: 0;
    left: 150px;
    right: 150px;
    border-radius: 6px 6px 0 0;
}
.prev {
    float: left;
}
.next {
    float: right
}
</style>
