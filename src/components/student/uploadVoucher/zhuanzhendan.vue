<template>
  <div class="zhuanzhendan">
    <p class="form-title"><i class="el-icon-notebook-2"></i>转诊单</p>

    <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <span>转诊单</span>
            <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>

    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]"
        >
            <el-input v-model="dynamicValidateForm.email"></el-input>
        </el-form-item>

        <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'域名' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
            }"
        >
            <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button @click="addDomain">新增域名</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'zhuanzhendan',
    components: {
        
    },
    data() {
        return {
        dynamicValidateForm: {
            domains: [{
            value: ''
            }],
            email: ''
        }
        };
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
            alert('submit!');
            } else {
            console.log('error submit!!');
            return false;
            }
        });
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
        },
        removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
            this.dynamicValidateForm.domains.splice(index, 1)
        }
        },
        addDomain() {
        this.dynamicValidateForm.domains.push({
            value: '',
            key: Date.now()
        });
        }
    }
}
</script>

<style lang="less" scoped>
.zhuanzhendan {
    .box-card {
        width: 780px;
    }
    .form-title {
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 18px ;
        margin-top: 0px;
        text-align: left;
        color: #F2F6FC;
        background-color: #7BD5FB;
        line-height: 2.0;
        padding-left: 30px;
        margin-bottom: 40px;
    }

}

.text {
    font-size: 14px;
}
.item {
    margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
    display: table;
content: "";
}
.clearfix:after {
    clear: both
}

</style>