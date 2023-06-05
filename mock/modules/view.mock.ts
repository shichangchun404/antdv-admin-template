import type { MockHttpItem } from 'vite-plugin-mock-dev-server'
export const view: MockHttpItem[] = [
  {
    url: '/api/strategy/view',
    method: ['GET'],
    delay: 100,
    body: {
      code: 0,
      data: {
        strategyViewList: [
          {
            viewName: '全局视图',
            total: 20
          },
          {
            viewName: 'veiw-1',
            total: 20
          },
          {
            viewName: 'veiw-2',
            total: 30
          }
        ]
      },
      message: 'success'
    }
  }
]

export default view
