import axios from '@/api/axios'
import { getToken } from '@/utils/auth'

export const login = (data: any) => {
  // return axios.post('/api/v1/auth/login', data)
  return Promise.resolve({
    code: 20000,
    data: { token: 'tokenxxxxx' }
  })
}

export const getUserInfo = (): any => {
  // return axios.get('/api/v1/user/info')
  return Promise.resolve({
    code: getToken() ? 20000 : -1,
    data: {
      username: 'admin',
      nickname: 'admin_nick',
      permission: ['read_server']
    }
  })
}
