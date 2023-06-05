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
  { label: 'AAA', value: 'aaa' },
  { label: 'BBB', value: 'bbb' },
  { label: 'CCC', value: 'ccc' }
]

// 转发匹配类型
export const matchTypeList = [
  { label: 'AAA', value: 'aaa' },
  { label: 'BBB', value: 'bbb' },
  { label: 'CCC', value: 'ccc' }
]
export const defaultMatchType = 'aaa'

// 转发类型
export const transTypeList = [
  { label: 'AAA', value: 'aaa' },
  { label: 'BBB', value: 'bbb' },
  { label: 'CCC', value: 'ccc' }
]
export const defaulTtransType = 'aaa'

export const globalView = '全局视图'
export const dateFormat = 'YYYY-MM-DD hh:mm:ss'

export const forceTypeList = [
  { label: 'AAA', value: 'aaa' },
  { label: 'BBB', value: 'bbb' },
  { label: 'CCC', value: 'ccc' }
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
