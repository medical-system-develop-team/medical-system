<template>
  <div id="BatchIn">
    <el-dialog title="批量导入用户信息" :visible.sync="dialogBatchIn.show">
      <el-upload
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :before-upload="beforeUpload"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :http-request="uploadFile">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过1M</div>
      </el-upload>
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeUpload(file) {
        var FileExt = file.name.replace(/.+\./, ""); 
        let size = file.size / 1024 / 1024;      
        if (['xlsx','xls'].indexOf(FileExt.toLowerCase()) === -1){            
          this.$message({ 
            type: 'warning', 
            message: '请上传excel文件！' 
        });
        if(size > 1) {
          this.$message.warning('文件大小不得超过1M');
        }                
        return false;       
        }
      },
      uploadFile(item) {
        let fileObj = item.file
        const form = new FormData()// FormData 对象
        form.append('userBatch', fileObj)// 文件对象  'upload'是后台接收的参数名
        console.log("adad",form,fileObj)
        axiospost("/statistical/uploadbug",{
          data:form,
          headers:{'Content-type': 'multipart/form-data'}            
        }).then(res=>{
           if(res.code === 200){
                this.$message.success('上传成功')
                return
              }else{
                 this.$message.warning('上传失败')
              }
            })

        /* this.axios({
          url: "http://",
          data: form,
          type: "POST",
          contentType: "multipart/form-data",
          processData: false, //告诉jquery不要对form进行处理
          contentType: false, //指定为false才能形成正确的Content-Type
          success: function (res) {}
        }) */
      }
      /*submitUpload() {
        this.$refs.upload.submit();
        this.$emit('updatebatchin');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      } */
    }
  }
</script>