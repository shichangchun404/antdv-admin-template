import http from '@/api/axios'
import { ICreateView, ISearchViewParams, IView, IViewResult } from '@/api/model/viewModel'

enum Api {
  List = '/strategy/view',
  SEARCH_VIEW = '/resource/view/search',
  CREATE_VIEW = '/resource/view/create',
  UPDATE_VIEW = '/resource/view/update',
  DELETE_VIEW = '/resource/view/delete'
}

export const getViewList = <T>(): Promise<T> => http.get(Api.List)


export const searchView = (data: ISearchViewParams): Promise<IPageResult<IViewResult>> => http.get(Api.SEARCH_VIEW, { params: data })

export const createView = (data: IBatchCreateParams<ICreateView>): Promise<IBatchSubmitResult<IView>> => {
  return http.post(Api.CREATE_VIEW, data)
}

export const updateView = (data: IView): Promise<IView> => {
  return http.patch(Api.UPDATE_VIEW, data)
}

export const deleteView = (data: IBatchDeleteParams): Promise<IBatchSubmitResult<string>> => http.delete(Api.DELETE_VIEW, { data })
