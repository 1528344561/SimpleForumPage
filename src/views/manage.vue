<script setup>

import {ref} from 'vue'
import {barAddService} from '@/api/bar.js'
import {ElMessage} from 'element-plus'
//控制添加贴吧弹窗
const dialogVisible = ref(false)

//添加贴吧数据模型
const barModel = ref({
    barName: '',
    barIntroduction: ''
})
//添加贴吧表单校验
const rules = {
    barName: [
        { required: true, message: '请输入贴吧名称', trigger: 'blur' },
    ],
    barIntroduction: [
        { required: true, message: '请输入贴吧别名', trigger: 'blur' },
    ]
}

const addBar =async()=> {
    let result = await barAddService(barModel.value);
    console.log(result.data)
    ElMessage.success(result.message?result.message:'添加成功')

    dialogVisible.value = false
}   

dialogVisible.value=true

</script>
<template >
    <el-dialog v-model="dialogVisible" title="创建贴吧" width="30%">
    <el-form :model="barModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="贴吧名称" prop="barName">
            <el-input v-model="barModel.barName" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="贴吧介绍" prop="barIntroduction">
            <el-input v-model="barModel.barIntroduction" minlength="1" maxlength="15"></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addBar"> 确认 </el-button>
        </span>
    </template>
</el-dialog>
</template>