<template>
  <div>
    <a-modal v-model:visible="visible" :maskClosable="false" title="批量删除" width="60%">
      <div>
        <a-alert
          :message="`共删除${selectedRows.length} 条数据`"
          type="warning"
          style="margin-bottom: 10px"
        />
        <a-table :columns="selectColumns" :data-source="selectedRows" :pagination="false">
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'status'">
              <a-badge color="green" text="正常" v-if="text == StatusEnum.NORMAL" />
              <a-badge color="red" text="未使用" v-if="text == StatusEnum.UNUSE" />
            </template>
          </template>
        </a-table>
      </div>
      <template #footer>
        <a-button key="back" @click="visible = false">取消</a-button>
        <a-button key="submit" type="primary" @click="onSubmit">确认</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { StatusEnum } from '@/enum/strategyEnum'

const props = defineProps({
  selectedRows: {
    type: Array<IEcsTableItem>,
    default: () => []
  },
  selectColumns: {
    type: Array,
    default: () => []
  },
  postDelete: {
    type: Function,
    required: true
  }
})
const emits = defineEmits(['refreshList'])

const visible = ref(false)

const onSubmit = () => {
  const content = `确认对已选中的 ${props.selectedRows.length} 条数据进行批量删除`
  Modal.confirm({
    title: '批量删除',
    content,
    okText: '确认',
    cancelText: '取消',
    onOk: switchApi
  })
}

const switchApi = async () => {
  let params: IManageParams = {
    list: props.selectedRows.map((item) => item.id)
  }
  const data = await props.postDelete(params)
  if (data && data.failList.length == 0) {
    message.success('提交成功')
    closeModal()
    emits('refreshList')
  } else {
    message.error(`删除失败的节点: ${data.failList.join(',')}`)
  }
}

const openModal = () => {
  visible.value = true
}

const closeModal = () => {
  visible.value = false
}

defineExpose({
  openModal
})
</script>
