// 策略状态
export const statusList = [
  { label: '全部', value: null },
  { label: '正常', value: 'normal' },
  { label: '未生效', value: 'unuse' }
]

export const allList = [{ label: '全部', value: null }]
// 策略来源
export const originList = [
  { label: '全部', value: null },
  { label: '本地', value: 'local' },
  { label: 'DRMS', value: 'drms' },
  { label: 'IMSM', value: 'isms' },
  { label: 'RMSM', value: 'rsms' }
]

// 转发匹配类型
export const matchTypeList = [
  { label: 'name', value: 'name' },
  { label: 'subzone', value: 'subzone' },
  { label: 'domain', value: 'domain' }
]
export const defaultMatchType = 'name'

// 转发类型
export const transTypeList = [
  { label: 'only', value: 'only' },
  { label: 'first', value: 'first' }
]
export const defaulTtransType = 'only'

export const globalView = '全局视图'
export const dateFormat = 'YYYY-MM-DD hh:mm:ss'

export const forceTypeList = [
  { label: 'A/AAAA', value: 'A/AAAA' },
  { label: 'stop', value: 'stop' }
]
export const defaultForceType = 'A/AAAA'

export const selectColumnList = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
    fixed: 'left'
  },
  {
    title: '策列描述',
    dataIndex: 'desc',
    width: 120
  },
  {
    title: '生效View',
    dataIndex: 'effectView',
    width: 150
  },
  {
    title: '来源',
    dataIndex: 'origin',
    width: 150
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    fixed: 'right'
  }
]
