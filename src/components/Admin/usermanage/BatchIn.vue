<template>
  <div id="BatchIn">
    <el-dialog title="批量导入用户信息" :visible.sync="dialogBatchIn.show">
      <input type="file"  @change="getFile($event)"><br>
      <el-button size="mini" type="primary" icon="edit"  @click="submit($event)">excel导入</el-button> 
          
      <!-- <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :limit=limitNum
        :on-exceed="exceedFile"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excle文件，且不超过500kb</div>
      </el-upload> -->
    </el-dialog>
    
  </div>
</template>

<script>
  import { axiospost } from '@/api/index.js'
  import axios from 'axios'
  export default {
    props:{
      dialogBatchIn:Object
    },
    data() {
      return {

        limitNum: 1,  // 上传excell时，同时允许上传的最大数
        fileList: []
        //fileList: [],   // excel文件列表
      };
    },
    methods: {
      getFile: function (event) {
        this.file = event.target.files[0];
        this.file.name
        console.log(this.file);
      },
      submit: function (event) {
        if(this.file == null){
          alert("文件为空,请选择文件进行导入");
        }else{
          //阻止元素发生默认的行为
        event.preventDefault();
        let formData = new FormData();
        formData.append("file", this.file);
        axiospost("url", formData)
          .then(function (response) {
            alert(response.data);
            console.log(response);
            this.$emit('updatebatchin');
          })
          .catch(function (error) {
            alert("上传失败,请核对excel表格数据");
            console.log(error);
            alert(error);
            //window.location.reload();
          });

        }
        
      },
    }
  }
</script>