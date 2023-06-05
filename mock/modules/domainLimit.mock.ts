import type { MockHttpItem } from 'vite-plugin-mock-dev-server'
export const strategy_domainLimit: MockHttpItem[] = [
  {
    url: '/api/strategy/domainLimit/search',
    method: ['GET'],
    delay: 2000,
    body: {
      code: 0,
      data: {
        list: [
          {
            id: 'e502ec4f-15ac-400a-a3fa-5fe25b389a36',
            origin: 'local',
            status: 'normal',
            effectView: 'view-1',
            startTime: '2023-01-02 03:04:05',
            endTime: '2023-01-03 03:04:05',
            domain: 'testdomain.com',
            maxQPS: 150,
            accurateMatch: true,
            desc: 'quaqua',
            lastModifyTime: '2023-05-22 11:17:11',
            lastModifyUser: 'testuser1'
          },
          {
            id: 'e502ec4f-15ac-400a-a3fa-5fe25b389a37',
            origin: 'local',
            status: 'normal',
            effectView: 'view-1',
            startTime: '2023-01-02 03:04:05',
            endTime: '2023-01-03 03:04:05',
            domain: 'testdomain.com',
            maxQPS: 150,
            accurateMatch: false,
            desc: 'quaqua',
            lastModifyTime: '2023-05-22 11:17:11',
            lastModifyUser: 'testuser1'
          }
        ],
        total: 44
      },
      message: 'success'
    }
  },
  {
    url: '/api/strategy/domainLimit/create',
    method: ['POST'],
    delay: 2000,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      code: 0,
      data: {
        id: 'e502ec4f-15ac-400a-a3fa-5fe25b389a36',
        origin: 'local',
        status: 'normal',
        effectView: 'view-1',
        startTime: '2023-01-02 03:04:05',
        endTime: '2023-01-03 03:04:05',
        originUrl: 'www.baidu.com',
        matchType: 'domain',
        transType: 'only',
        transIp: '1.1.1.1,2.2.2.2',
        desc: '',
        lastModifyTime: '2023-05-22 11:17:11',
        lastModifyUser: 'testuser1'
      },
      message: 'success'
    }
  },
  {
    url: '/api/strategy/domainLimit/update',
    method: ['POST', 'PATCH'],
    delay: 2000,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      code: 0,
      data: {
        id: 'e502ec4f-15ac-400a-a3fa-5fe25b389a36',
        origin: 'local',
        status: 'normal',
        effectView: 'view-1',
        startTime: '2023-01-02 03:04:05',
        endTime: '2023-01-03 03:04:05',
        originUrl: 'www.baidu.com',
        matchType: 'domain',
        transType: 'only',
        transIp: '1.1.1.1,2.2.2.2',
        desc: '',
        lastModifyTime: '2023-05-22 11:17:11',
        lastModifyUser: 'testuser1'
      },
      message: 'success'
    }
  },
  {
    url: '/api/strategy/domainLimit/delete',
    method: ['POST', 'DELETE'],
    delay: 2000,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      code: 0,
      data: {
        successList: ['e502ec4f-15ac-400a-a3fa-5fe25b389231'],
        failList: []
      },
      message: 'success'
    }
  },
  {
    url: '/api/strategy/domainLimit/manage',
    method: ['POST'],
    delay: 2000,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      code: 0,
      data: {
        sucessList: ['e502ec4f-15ac-400a-a3fa-5fe25b389a36'],
        failList: []
      },
      message: 'success'
    }
  }
]

export default strategy_domainLimit
