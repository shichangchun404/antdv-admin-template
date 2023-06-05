import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { Modal, message } from 'ant-design-vue'
import { ref, computed } from 'vue'
import { OperateEnum, ManageTypeEumn } from '@/enum/strategyEnum'

export const useCreateModal = (
  props: IStrategyProps,
  formDataRef: IStrategyTableItem,
  rulesRef: Record<string, Rule[]>,
  globalView: string,
  resetFields: Function,
  validate: Function,
  switchApi: Function
) => {
  const loading = ref(false)
  const visible = ref(false)
  const title = computed(() => {
    return formDataRef.id ? '编辑' : '新增'
  })
  const filterGlobalViewList = computed(() => {
    return props.viewList.filter((it) => it.viewName != globalView)
  })
  const onGlobalViewChange = (value: boolean) => {
    if (value) {
      formDataRef.effectView = [globalView]
    } else {
      formDataRef.effectView = []
    }
  }

  const onEffectTimeChange = (value: boolean) => {
    rulesRef.timeRange[0].required = value
    formDataRef.timeRange = []
  }

  const handleClose = () => {
    visible.value = false
    resetFields()
  }

  const openModal = () => {
    visible.value = true
  }

  const initForm = (data: IStrategyTableItem) => {
    Object.assign(formDataRef, data)
    formDataRef.effectView = (data.effectView as string).split(',')
    if (!data.effectView?.includes(globalView)) {
      formDataRef.globalViewChecked = false
    }
    if (data.startTime && data.endTime) {
      formDataRef.timeRange = [data.startTime, data.endTime]
    } else {
      formDataRef.effectTimeCheck = false
      rulesRef.timeRange[0].required = false
    }
  }

  const onSubmit = () => {
    loading.value = true
    validate()
      .then(async () => {
        await switchApi()
      })
      .catch((err: any) => {
        console.log('error', err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
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
  }
}

export const useStrategyList = (
  searchParam: any,
  getList: IGetListFun,
  getViewList: IGetListFun,
  postDelete: Function,
  postManage: Function
) => {
  const loading = ref(false)
  const viewList = ref<IStrategyViewItem[]>([])
  const formRef = ref<FormInstance>()
  const addModalRef = ref()
  const batchModalRef = ref()
  const tableData = ref<IPageResult<IStrategyTableItem[]>>({
    list: [],
    total: 0
  })
  const selectedRowsRef = ref<IStrategyTableItem[]>([])
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[], selectedRows: IStrategyTableItem[]) => {
      selectedRowsRef.value = selectedRows
    },
    onSelect: (
      record: IStrategyTableItem,
      selected: boolean,
      selectedRows: IStrategyTableItem[]
    ) => {
      selectedRowsRef.value = selectedRows
    },
    onSelectAll: (selected: boolean, selectedRows: IStrategyTableItem[]) => {
      selectedRowsRef.value = selectedRows
    }
  })
  const getViewData = async () => {
    loading.value = true
    const data = await getViewList<IStrategyView>({})
    viewList.value = data.strategyViewList
    searchParam.effectView = viewList.value[0].viewName
    onQueryList()
  }
  const onQueryList = async () => {
    loading.value = true
    selectedRowsRef.value = []
    const data = await getList<IPageResult<IStrategyTableItem[]>>(searchParam)
    tableData.value = data
    loading.value = false
  }
  const onResetFields = () => {
    formRef.value?.resetFields()
  }
  const onAdd = () => {
    addModalRef.value.openModal()
  }
  const onEdit = (column: any) => {
    addModalRef.value.initForm(JSON.parse(JSON.stringify(column)))
    addModalRef.value.openModal()
  }
  const onBatchDelete = () => {
    batchModalRef.value.openModal(OperateEnum.DELETET_BATCH)
  }
  const onBatchSubmit = () => {
    batchModalRef.value.openModal(OperateEnum.SUBMIT_BATCH)
  }
  const handerSelected = (view: IStrategyViewItem) => {
    searchParam.effectView = view.viewName
    onQueryList()
  }
  const onOperate = (type: OperateEnum, record: IStrategyTableItem) => {
    Modal.confirm({
      title: '二次确认',
      content: `确认${type}策略${record.desc}？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        return switchOperationApi(type, record)
      }
    })
  }
  const switchOperationApi = async (type: OperateEnum, record: IStrategyTableItem) => {
    let data = null
    const params: IManageParams = {
      list: [record.id]
    }
    switch (type) {
      case OperateEnum.DELETET:
        data = await postDelete(params)
        break
      case OperateEnum.STOP:
        params.type = ManageTypeEumn.STOP
        data = await postManage(params)
        break
      case OperateEnum.SUBMIT:
        params.type = ManageTypeEumn.USE
        data = await postManage(params)
        break
      default:
        break
    }
    if (data) {
      message.success('操作成功')
      onQueryList()
    }
  }
  const onPagerChange = (pageNum = 1, pageSize = 10) => {
    searchParam.pageNum = pageNum
    searchParam.pageSize = pageSize
    onQueryList()
  }
  return {
    loading,
    viewList,
    formRef,
    addModalRef,
    batchModalRef,
    tableData,
    selectedRowsRef,
    rowSelection,
    getViewData,
    onQueryList,
    onResetFields,
    onAdd,
    onEdit,
    onBatchDelete,
    onBatchSubmit,
    handerSelected,
    onOperate,
    onPagerChange
  }
}
