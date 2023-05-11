import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { getUserInfo } from '@/api/api.user'
import { useUserStore } from '@/store/user'
import base from './modules/base'
import server from './modules/server'
import recursion from './modules/recursion'

export const menuRoutes: RouteRecordRaw[] = [...server, ...recursion]
const router = createRouter({
  history: createWebHistory(),
  routes: [...base, ...menuRoutes]
})

/**
 * 登录校验
 */
const wihitList = ['/login']
router.beforeEach(async (to, from, next) => {
  try {
    if (wihitList.includes(to.path)) {
      next()
    } else {
      const data = await getUserInfo()
      const store = useUserStore()
      if (data && data.code === 20000) {
        store.username = data.data.username
        store.nickname = data.data.nickname
        store.permission = data.data.permission
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  } catch (error) {
    next(`/login?redirect=${to.path}`)
  }
})

export default router
