import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { useUserStore } from '@/store/user'
import { message, Modal } from 'ant-design-vue'

const instance: AxiosInstance = axios.create({
  timeout: 5 * 1000,
  baseURL: '/api'
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.getToken) {
      config.headers['Authorization'] = `Bearer ${userStore.getToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const userStore = useUserStore()
    const res = response.data

    switch (res.code) {
      case 0:
        return res.data
      case 401:
        // token过期
        Modal.confirm({
          title: '确定登出',
          content: '登录已过期，请重新登录',
          okText: '重新登录',
          cancelText: '取消',
          onOk() {
            userStore.logout(true)
          }
        })
        return Promise.reject(new Error(res.message || 'Error'))
      default:
        message.error(res.message || '网络错误', 5)
        return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error: AxiosError) => {
    message.error(error.message, 5)
    return Promise.reject(error)
  }
)

export default instance
