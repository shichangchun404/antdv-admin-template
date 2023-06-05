
export interface IView {
  id: string
  // 视图名称
  viewName: string
  // 视图类型 cache/recursion
  type: string
  // 设备组ID
  groupId: string
  // 客户端范围，多个IP','分割。带掩码/不带掩码
  clientRange: string
  // 转发地址，多个IP','分割。不带掩码
  routeAddr: string
  // 优先级
  priority: number
  // 是否开启ECS
  ecs: boolean
  // 描述
  desc: string
  // 仅允许输入正整数
  // type=cache
  cacheSlabs: number
  // 仅允许输入正整数
  // type=cache：是
  cacheSize: number
  // 黑名单策略 drop/reject/designIp
  // type=cache：是
  blackListPolicy: string
  // 仅允许输入正整数，0则无限制;
  // type=cache && blackListPolicy=designIp：是
  ttl: number
  // ipv4地址;
  // type=cache && blackListPolicy=designIp：是
  ipv4: string
  // ipv6地址
  // type=cache && blackListPolicy=designIp：是
  ipv6: string
  // ecs发送类型  empty/fwd-subnet/ecs-subnet
  // type=recursion：是
  ecsSendType: string
  // 是否进行ecs查询切换
  // type=recursion：是
  ecsQuerySwitch: boolean
  // ecs ipv4子网
  ecsSubnetV4: string
  // ecs ipv6子网
  ecsSubnetV6: string
  // ipv4子网
  // type=cache && ecs=true：是
  subnetV4: string
  // ipv6子网
  // type=cache && ecs=true：是
  subnetV6: string
  // cdn ipv4子网
  // type=cache && ecs=true：是
  cdnSubnetV4: string
  // cdn ipv6子网
  // type=cache && ecs=true：是
  cdnSubnetV6: string
}

export interface ICreateView extends Omit<IView, 'id'>{}

export interface ISearchViewParams extends Pick<IView, 'viewName'| 'type' | 'routeAddr' | 'clientRange'>, IPageParams {
  ecs: string
}

export interface IViewResult extends IView,ILastModify {}
