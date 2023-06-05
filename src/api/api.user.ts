import axios from '@/api/axios'
import { UserInfo } from '@/store/user'

export const login = (data: any) => {
  // return axios.post('/api/v1/auth/login', data)
  return Promise.resolve({
    token: 'tokenxxxxx'
  })
}

export const getUserInfo = (): Promise<UserInfo> => {
  // return axios.get('/api/v1/user/info')
  return Promise.resolve({
    userId: 10000,
    username: 'admin',
    permission: ['read_server'] as any
  })
}

export function logout() {
  return Promise.resolve({})
}
