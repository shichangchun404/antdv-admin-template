import http from '@/api/axios'

enum Api {
  SEARCH = '/strategy/ns/search',
  CREATE = '/strategy/ns/create',
  UPDATE = '/strategy/ns/update',
  DELETE = '/strategy/ns/delete',
  MANAGE = '/strategy/ns/manage'
}
export const getList = <T>(data: any): Promise<T> => http.get(Api.SEARCH, { params: data })
export const postCreate = <T>(data: any): Promise<T> => http.post(Api.CREATE, data)
export const postUpdate = <T>(data: any): Promise<T> => http.patch(Api.UPDATE, data)
export const postDelete = <T>(data: any): Promise<T> => http.delete(Api.DELETE, { data })
export const postManage = <T>(data: any): Promise<T> => http.post(Api.MANAGE, data)
