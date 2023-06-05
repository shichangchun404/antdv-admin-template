
interface IPageParams {
  pageNum: number
  pageSize: number
}

interface IBatchCreateParams<T = any> {
  list: T[]
}

interface IBatchDeleteParams {
  list: string[]
}

interface ILastModify {
  lastModifyTime: string
  lastModifyUser: string
}

interface IResponse<T = any> {
  code: number
  message: string
  data: T
}

interface IPageResult<T> {
  list: T[]
  total: number
}

interface IBatchSubmitResult<T = any> {
  successList: T[]
  failList: string[]
}


