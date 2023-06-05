
export interface IGroup {
  id: string
  groupName: string
  routeArea: string
  ospfIp: string
  mark: string
}

export interface ICreateGroup extends Omit<IGroup, 'id'>{}

export interface ISearchGroupParams extends Pick<IGroup, 'groupName' | 'routeArea' | 'ospfIp'>, IPageParams {}

export interface IGroupResult extends IGroup, ILastModify {
  serverNum: number
}
