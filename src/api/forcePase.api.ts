import http from '@/api/axios'

enum Api {
  SEARCH = '/strategy/forceParse/search',
  CREATE = '/strategy/forceParse/create',
  UPDATE = '/strategy/forceParse/update',
  DELETE = '/strategy/forceParse/delete',
  MANAGE = '/strategy/forceParse/manage'
}
export const getList = <T>(data: any): Promise<T> => http.get(Api.SEARCH, { params: data })
export const postCreate = <T>(data: any): Promise<T> => http.post(Api.CREATE, data)
export const postUpdate = <T>(data: any): Promise<T> => http.patch(Api.UPDATE, data)
export const postDelete = <T>(data: any): Promise<T> => http.delete(Api.DELETE, { data })
export const postManage = <T>(data: any): Promise<T> => http.post(Api.MANAGE, data)
