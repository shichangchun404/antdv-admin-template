<template>
  <div>
    <a-modal
      v-model:visible="state.visible"
      destroyOnClose
      :maskClosable="false"
      width="60%"
      @cancel="closeModal()"
    >
      <template #title>
        <div class="upload-title">
          批量新增
          <a-button type="link" size="small" @click="downLoadTemplate(templatePath)">
            <template #icon>
              <DownloadOutlined />
            </template>
            文件模板下载
          </a-button>
        </div>
      </template>
      <FileUpload
        ref="fileUploadRef"
        :error-list="state.errorList"
        :total="total"
        @change="onChange"
      ></FileUpload>
      <template #footer>
        <a-button key="back" @click="closeModal()">取消</a-button>
        <a-button key="submit" type="primary" @click="onSubmit" :disabled="!canSubmit"
          >确认</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import FileUpload from '@/components/FileUpload.vue'
import { downLoadTemplate } from '@/utils/file'

interface IState {
  visible: boolean
  loading: boolean
  correctList: IEcsTableItem[]
  errorList: string[]
}

const props = defineProps({
  templatePath: {
    type: String,
    required: true
  },
  postBatchCreate: {
    type: Function,
    required: true
  },
  validateState: {
    type: Function,
    required: true
  }
})

const emits = defineEmits(['refreshList'])

const state: IState = reactive({
  visible: false,
  loading: false,
  correctList: [],
  errorList: []
})
const total = computed(() => {
  return state.correctList.length + state.errorList.length
})
const canSubmit = computed(() => {
  return state.correctList.length > 0 && state.errorList.length === 0
})

const onChange = (success: any[], fail: string[]) => {
  state.errorList = fail
  state.correctList = []

  success.forEach((item) => {
    if (props.validateState(item)) {
      state.correctList.push(item)
    } else {
      state.errorList.push(item._originData)
    }
  })
}

const onSubmit = () => {
  const content = `确认对已上传 ${state.correctList.length} 条数据进行批量上传`
  Modal.confirm({
    title: '批量新增',
    content,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      const data = await props.postBatchCreate(state.correctList)
      if (data) {
        message.success('提交成功')
        closeModal()
        emits('refreshList')
      }
    }
  })
}

const openModal = () => {
  state.visible = true
}

const closeModal = () => {
  state.visible = false
  state.correctList = []
  state.errorList = []
}

defineExpose({
  openModal
})
</script>

<style scoped lang="less">
.upload-title {
  line-height: 22px;
  .ant-btn {
    float: right;
    margin-right: 15px;
  }
}
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
