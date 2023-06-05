<template>
  <div>
    <a-modal v-model:visible="visible" :maskClosable="false" :title="OperateType" width="60%">
      <div>
        <template v-if="OperateType == OperateEnum.SUBMIT_BATCH">
          <a-col>
            <a-col :span="6">
              <a-form-item label="批处理类型">
                <a-radio-group v-model:value="manageType" :options="manageOptions" />
              </a-form-item>
            </a-col>
          </a-col>
          <a-alert
            :message="`共处置 ${selectedRows.length} 条数据`"
            type="warning"
            style="margin-bottom: 10px"
          />
        </template>
        <a-alert
          v-if="OperateType == OperateEnum.DELETET_BATCH"
          :message="`共删除 ${selectedRows.length} 条数据`"
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
import { OperateEnum, ManageTypeEumn, StatusEnum } from '@/enum/strategyEnum'

const props = defineProps({
  selectedRows: {
    type: Array<IStrategyTableItem>,
    default: () => []
  },
  selectColumns: {
    type: Array,
    default: () => []
  },
  postDelete: {
    type: Function,
    required: true
  },
  postManage: {
    type: Function,
    required: true
  }
})
const emits = defineEmits(['refreshList'])
const manageOptions = [
  { label: '生效', value: ManageTypeEumn.USE },
  { label: '停用', value: ManageTypeEumn.STOP }
]
const manageType = ref(ManageTypeEumn.USE)
const visible = ref(false)
const OperateType = ref<OperateEnum>()
const onSubmit = () => {
  const content =
    OperateType.value == OperateEnum.SUBMIT_BATCH
      ? `确认对已选中的${props.selectedRows.length}条数据进行${
          manageType.value === ManageTypeEumn.USE ? '批量下发' : '批量停用'
        }`
      : `确认对已选中的${props.selectedRows.length}条数据进行批量删除`
  Modal.confirm({
    title: OperateType.value,
    content,
    okText: '确认',
    cancelText: '取消',
    onOk: switchApi
  })
}

const switchApi = async () => {
  let data = null
  let params: IManageParams = {
    list: props.selectedRows.map((item) => item.id)
  }
  switch (OperateType.value) {
    case OperateEnum.DELETET_BATCH:
      data = await props.postDelete(params)
      break
    case OperateEnum.SUBMIT_BATCH:
      params.type = manageType.value
      data = await props.postManage(params)
      break
    default:
      break
  }
  if (data && data.failList.length == 0) {
    message.success('提交成功')
    closeModal()
    emits('refreshList')
  } else {
    message.error(`${OperateType.value}失败的节点: ${data.failList.join(',')}`)
  }
}

const openModal = (type: OperateEnum) => {
  visible.value = true
  OperateType.value = type
}

const closeModal = () => {
  manageType.value = ManageTypeEumn.USE
  visible.value = false
}

defineExpose({
  openModal
})
</script>
