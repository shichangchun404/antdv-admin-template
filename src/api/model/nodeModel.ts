
export interface INode {
  id: string
  nodeName: string
  province: string
  city: string
  mark: string
}

export interface ICreateNode extends Omit<INode, 'id'> {}

export interface ISearchNodeParams extends Pick<INode, 'nodeName' | 'province' | 'city'>, IPageParams {}

export interface INodeResult extends INode, ILastModify {
  serverNum: number
}
