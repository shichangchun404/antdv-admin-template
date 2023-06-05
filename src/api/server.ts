import http from '@/api/axios'
import type { ICreateServer, ISearchServerParams, IServer } from '@/api/model/serverModel'
import { IServerResult } from '@/api/model/serverModel'

enum Api {
  SEARCH_SERVER = '/resource/server/search',
  CREATE_SERVER = '/resource/server/create',
  UPDATE_SERVER = '/resource/server/update',
  DELETE_SERVER = '/resource/server/delete'
}

export const searchServer = (data: ISearchServerParams): Promise<IPageResult<IServerResult>> => http.get(Api.SEARCH_SERVER, { params: data })

export const createServer = (data: IBatchCreateParams<ICreateServer>): Promise<IBatchSubmitResult<IServer>> => {
  return http.post(Api.CREATE_SERVER, data)
}

export const updateServer = (data: IServer): Promise<IServer> => {
  return http.patch(Api.UPDATE_SERVER, data)
}

export const deleteServer = (data: IBatchDeleteParams): Promise<IBatchSubmitResult<string>> => http.delete(Api.DELETE_SERVER, { data })
