<template>
  <div>
    <a-modal v-model:visible="visible" :maskClosable="false" :title="title" @cancel="handleClose">
      <a-spin :spinning="loading" tip="加载中...">
        <a-form :model="formDataRef" name="basic" :rules="rulesRef" layout="vertical">
          <h3>策略配置</h3>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item name="domain" label="域名" v-bind="validateInfos.domain">
                <a-input v-model:value="formDataRef.domain" placeholder="请输入域名"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="desc" label="是否精准匹配">
                <a-switch
                  v-model:checked="formDataRef.accurateMatch"
                  checked-children="是"
                  un-checked-children="否"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="maxQPS" label="最大QPS">
                <a-input
                  v-model:value="formDataRef.maxQPS"
                  type="number"
                  placeholder="请输入最大QPS,空时无限制"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item name="desc" label="描述">
                <a-input
                  v-model:value="formDataRef.desc"
                  placeholder="请输入描述"
                  :maxlength="100"
                ></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <h3 class="top-line">下发配置</h3>
          <a-row :gutter="24">
            <a-col :span="4">
              <a-form-item name="desc" label="是否全局">
                <a-switch
                  v-model:checked="formDataRef.globalViewChecked"
                  checked-children="是"
                  un-checked-children="否"
                  @change="onGlobalViewChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="20">
              <a-form-item name="effectView" label="生效视图" v-bind="validateInfos.effectView">
                <a-select
                  :disabled="formDataRef.globalViewChecked"
                  ref="select"
                  v-model:value="formDataRef.effectView"
                  mode="multiple"
                  :options="filterGlobalViewList"
                  :fieldNames="{ label: 'viewName', value: 'viewName' }"
                  placeholder="请选择生效视图"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item name="desc" label="是否生效">
                <a-switch
                  v-model:checked="formDataRef.effectTimeCheck"
                  checked-children="是"
                  un-checked-children="否"
                  @change="onEffectTimeChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="20">
              <a-form-item name="timeRange" label="生效时间范围" v-bind="validateInfos.timeRange">
                <a-range-picker
                  :disabled="!formDataRef.effectTimeCheck"
                  v-model:value="formDataRef.timeRange"
                  show-time
                  :placeholder="['生效时间', '失效时间']"
                  :valueFormat="dateFormat"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>

      <template #footer>
        <a-button key="back" @click="handleClose" :disabled="loading">取消</a-button>
        <a-button html-type="submit" type="primary" :disabled="loading" @click="onSubmit()"
          >确认</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { message } from 'ant-design-vue'
import { validateDomainP } from '@/utils/validate'
import { Form } from 'ant-design-vue'
import { globalView, dateFormat } from '@/const/strategy'
import { useCreateModal } from '@/hooks/useStrategyHooks'
import { postCreate, postUpdate } from '@/api/domainLimit.api'

const props = defineProps({
  viewList: {
    type: Array<IStrategyViewItem>,
    default: () => []
  }
})
const emits = defineEmits(['refreshList'])

const formDataRef = reactive<IStrategyTableItem>({
  id: '',
  domain: '',
  maxQPS: null,
  accurateMatch: false,
  desc: '',
  effectView: [globalView],
  timeRange: [],
  globalViewChecked: true,
  effectTimeCheck: true
})
const rulesRef: Record<string, Rule[]> = reactive({
  domain: [{ required: true, validator: validateDomainP, trigger: 'change' }],
  effectView: [{ required: true, message: '请选择生效的视图', trigger: 'change' }],
  timeRange: [{ required: true, message: '请选择生效与失效时间', trigger: 'change' }]
})
const useForm = Form.useForm
const { resetFields, validate, validateInfos } = useForm(formDataRef, rulesRef, {
  onValidate: (...args) => console.log('表单校验结果  ', ...args)
})
const switchApi = async () => {
  let params = {
    id: formDataRef.id,
    domain: formDataRef.domain,
    maxQPS: formDataRef.maxQPS,
    accurateMatch: formDataRef.accurateMatch,
    desc: formDataRef.desc,
    effectView: (formDataRef.effectView as string[]).join(','),
    startTime: formDataRef.timeRange && formDataRef.timeRange[0],
    endTime: formDataRef.timeRange && formDataRef.timeRange[1]
  }
  let data: Nullable<IStrategyTableItem> = null
  if (formDataRef.id) {
    data = await postUpdate(params)
  } else {
    data = await postCreate(params)
  }
  if (data) {
    message.success('操作成功')
    handleClose()
    emits('refreshList')
  }
}

const {
  loading,
  visible,
  title,
  filterGlobalViewList,
  onGlobalViewChange,
  onEffectTimeChange,
  handleClose,
  openModal,
  initForm,
  onSubmit
} = useCreateModal(props, formDataRef, rulesRef, globalView, resetFields, validate, switchApi)

defineExpose({
  openModal,
  initForm
})
</script>
