<template>
  <div class="add_container addchArea">
        <el-form 
            :inline="true" 
            class="demo-form-inline add-form">
            <el-form-item>
                <el-button type="primary" size ="mini" icon="search" @click='adduser()'>添加用户</el-button>
            </el-form-item>
            <el-form-item class="btnRight">
                <el-button type="success" size ="mini" icon="view" style="margin-right: 20px;" @click='BatchIn()'>批量导入</el-button>
                <el-button type="danger" size ="mini" icon="view" @click='BatchDel()' :disabled="batchdelable" >批量删除</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
   import { mapGetters } from 'vuex'

  export default {
      name:'addItem',
      props:{
         batchdelable : Boolean ,
      },
      data(){
          return {
            //searchBtnDisabled : true
          }
      },
       computed:{
           ...mapGetters(['searchBtnDisabled']),
      },
      created(){
      },
      methods:{
          adduser(){
			this.$emit("adduser");
          },
          BatchIn(){
            this.$emit("BatchIn");
          },
          BatchDel(){
            this.$emit("BatchDel");
          }
      }
  }
</script>

<style lang="less" scoped>
    .add_container{
        margin-bottom: 10px;
        background:rgba(255, 255,255, 1);
    }
    .btnRight{
        float: right;
        margin-right: 20;
    }
    .addArea{
        background:rgba(255, 255,255, 1);
        border-radius:2px;
        padding: 18px 18px 0;
    }
</style>