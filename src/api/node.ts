import http from '@/api/axios'
import { ICreateNode, INode, INodeResult, ISearchNodeParams } from '@/api/model/nodeModel'

enum Api {
  SEARCH_NODE = '/resource/node/search',
  CREATE_NODE = '/resource/node/create',
  UPDATE_NODE = '/resource/node/update',
  DELETE_NODE = '/resource/node/delete'
}

export const searchNode = (data: ISearchNodeParams): Promise<IPageResult<INodeResult>> => {
  return http.get(Api.SEARCH_NODE, {params: data})
}
export const createNode = (data: IBatchCreateParams<ICreateNode>): Promise<IBatchSubmitResult<INode>> => {
  return http.post(Api.CREATE_NODE, data)
}
export const updateNode = (data: INode): Promise<INode> => http.patch(Api.UPDATE_NODE, data)
export const deleteNode = (data: IBatchDeleteParams): Promise<IBatchSubmitResult<string>> => http.delete(Api.DELETE_NODE, { data })
