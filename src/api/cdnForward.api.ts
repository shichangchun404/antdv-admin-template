import http from '@/api/axios'

enum Api {
  SEARCH = '/cdn/forward/search',
  CREATE = '/cdn/forward/create',
  UPDATE = '/cdn/forward/update',
  DELETE = '/cdn/forward/delete'
}
export const getList = <T>(data: any): Promise<T> => http.get(Api.SEARCH, { params: data })
export const postCreate = <T>(data: any): Promise<T> => http.post(Api.CREATE, data)
export const postUpdate = <T>(data: any): Promise<T> => http.patch(Api.UPDATE, data)
export const postDelete = <T>(data: any): Promise<T> => http.delete(Api.DELETE, { data })
