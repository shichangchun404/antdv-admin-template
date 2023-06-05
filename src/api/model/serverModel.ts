
export interface IServer {
  id: string
  // 服务器IP
  ip: string
  // 类型cache/recursion/copy/collection
  type: string
  // 设备组ID
  groupId: string
  // 节点ID
  nodeId: string
  // 备注
  mark: string
  // 递归版本
  recursionVersion: string
  // 操作系统
  system: string
  // 序列号
  sn: string
  // 服务器型号
  model: string
  // 公网IP
  internetIp: string
  // 管理IP
  manageIp: string
  // 远程管理IP
  remoteIp: string
  // 上线时间，具体到天
  onlineTime: string
  // 维保到期时间，具体到天
  serviceDeadlineTime: string
  // 工程名称
  projectName: string
  // 机架位置
  location: string
  // 包机人
  owner: string
}

export interface ICreateServer extends Omit<IServer, 'id'>{}

export interface ISearchServerParams extends Pick<IServer, 'ip'| 'type' | 'groupId' | 'nodeId'>, IPageParams {}

export interface IServerResult extends IServer,ILastModify {}
