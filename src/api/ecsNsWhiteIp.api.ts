import http from '@/api/axios'

enum Api {
  SEARCH = '/ecs/nsWhiteIp/search',
  CREATE = '/ecs/nsWhiteIp/create',
  UPDATE = '/ecs/nsWhiteIp/update',
  DELETE = '/ecs/nsWhiteIp/delete'
}
export const getList = <T>(data: any): Promise<T> => http.get(Api.SEARCH, { params: data })
export const postCreate = <T>(data: any): Promise<T> => http.post(Api.CREATE, data)
export const postUpdate = <T>(data: any): Promise<T> => http.patch(Api.UPDATE, data)
export const postDelete = <T>(data: any): Promise<T> => http.delete(Api.DELETE, { data })
