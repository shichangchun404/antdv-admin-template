import http from '@/api/axios'
import type {
  ICreateGroup,
  IGroup,
  IGroupResult,
  ISearchGroupParams
} from '@/api/model/serverGroupModel'
import { IServer } from '@/api/model/serverModel'

enum Api {
  SEARCH_GROUP = '/resource/group/search',
  CREATE_GROUP = '/resource/group/create',
  UPDATE_GROUP = '/resource/group/update',
  DELETE_GROUP = '/resource/group/delete'
}

export const searchGroup = (data: ISearchGroupParams): Promise<IPageResult<IGroupResult>> => {
  return http.get(Api.SEARCH_GROUP, { params: data })
}

export const createGroup = (data: IBatchCreateParams<ICreateGroup>): Promise<IBatchSubmitResult<IGroup>> => {
  const list = data.list.map(group => {
    return {
      ...group,
      routeArea: parseInt(group.routeArea)
    }
  })
  return http.post(Api.CREATE_GROUP, { list })
}
export const updateGroup = (data: IGroup): Promise<IServer> => {
  const param = {
    ...data,
    routeArea: parseInt(data.routeArea)
  }
  return http.patch(Api.UPDATE_GROUP, param)
}
export const deleteGroup = (data: IBatchDeleteParams): Promise<IBatchSubmitResult<string>> => http.delete(Api.DELETE_GROUP, { data })
