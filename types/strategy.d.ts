interface IGetListFun {
  <T>(data: any): Promise<T>
}

interface IStrategyViewItem {
  viewName: string
  total: number
}

interface IStrategyView {
  strategyViewList: IStrategyViewItem[]
}

interface IManageResult {
  sucessList: string[]
  failList: string[]
}

interface IManageParams {
  list: string[]
  type?: Nullable<string>
}

interface IStrategyTableItem {
  id: string
  origin?: string
  status?: string
  effectView?: string | string[]
  timeRange?: string[]
  startTime?: string
  endTime?: string
  desc?: string
  lastMotifyTime?: string
  lastMotifyUser?: string
  qname?: string
  cname?: string
  originUrl?: string
  matchType?: string
  transType?: string
  transIp?: string
  globalViewChecked?: boolean
  effectTimeCheck?: boolean
  domain?: string
  maxQPS?: number | null
  accurateMatch?: boolean
  clientIP?: string
  routeAddr?: string
  TTL?: number | null
  isZone?: boolean
  forceType?: string
  parseRecord?: string
  zone?: string
}

interface IStrategyProps {
  viewList: Array<IStrategyViewItem>
}
