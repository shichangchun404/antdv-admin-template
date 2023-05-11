import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { getToken } from '@/utils/auth'

const instance: AxiosInstance = axios.create({
  timeout: 60 * 1000,
  headers: { Authorization: `Bearer ${getToken()}` },
  baseURL: '/',
  withCredentials: true
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    const result = res.data
    return result
  },
  (error: AxiosResponse) => {
    return Promise.reject(error)
  }
)

export default instance
