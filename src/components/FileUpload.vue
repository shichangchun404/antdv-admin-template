<script setup lang="ts">
import { InboxOutlined } from '@ant-design/icons-vue'
import { computed, reactive } from 'vue'
import { csvParser, fileReaderP } from '@/utils/file'
import { message } from 'ant-design-vue'

interface IState {
  fileList: File[]
}

const props = defineProps({
  total: { type: Number, required: true },
  errorList: { type: Array, required: true }
})

const emit = defineEmits(['change'])

const state: IState = reactive({
  fileList: []
})

const errorCount = computed(() => {
  return props.errorList.length
})

const customRequest = async ({ file, onSuccess, onProgress, onError }: {
  file: File,
  onSuccess: Function,
  onProgress: Function,
  onError: Function
}) => {
  try {
    const reader = await fileReaderP(file, { accept: '.csv' })
    onProgress({ percent: 50 })
    const { success, fail } = csvParser(reader.result as string)
    emit('change', success, fail)
    onSuccess()
  } catch (e: any) {
    message.error(e.message)
    onError(e)
    onRemove()
  }
}

const onRemove = () => {
  emit('change', [], [])
}

const clear = () => {
  state.fileList = []
}

defineExpose({
  clear
})
</script>

<template>
  <a-upload-dragger
    v-model:fileList="state.fileList"
    accept=".csv"
    :maxCount="1"
    :customRequest="customRequest"
    @remove="onRemove"
  >
    <p class="ant-upload-drag-icon">
      <InboxOutlined></InboxOutlined>
    </p>
    <p class="ant-upload-text">点击或将文件拉入本区域进行文件上传</p>
    <p class="ant-upload-hint">仅支持.CSV格式，最大支持1MB大小</p>
  </a-upload-dragger>
  <p class="upload-result" v-show="props.total > 0">
    本次共添加{{ props.total }}条数据
    <span v-show="errorCount > 0">，其中存在{{ errorCount }}个错误，请核实后重新输入，错误列表如下</span>
  </p>
  <div class="error-result" v-show="errorCount > 0">
    <p class="error-item" v-for="item in errorList">{{ item }}</p>
  </div>
</template>

<style scoped lang="less">
.upload-result {
  margin-top: 10px;
}
.error-result {
  border: 1px solid #efefef;
  padding: 10px 20px 0;
  height: 200px;
  overflow: auto;
}
</style>
