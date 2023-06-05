import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import base from './modules/base'
import dashboard from './modules/dashboard'
import cache from '@/router/modules/cache'
import { PageEnum } from '@/enum/pageEnum'

export const menuRoutes: RouteRecordRaw[] = [dashboard, cache]
const router = createRouter({
  history: createWebHistory(),
  routes: [...base, ...menuRoutes]
})

/**
 * 登录校验
 */
const whitePathList = [PageEnum.BASE_LOGIN]
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.getToken
  if (whitePathList.includes(to.path as PageEnum)) {
    if (to.path === PageEnum.BASE_LOGIN && token) {
      try {
        await userStore.afterLoginAction()
        next((to.query?.redirect as string) || '/')
        return
      } catch {
        //
      }
    }
    next()
    return
  }
  // token or user does not exist
  if (!token) {
    // You can access without permission. You need to set the routing meta.ignoreAuth to true
    if (to.meta.ignoreAuth) {
      next()
      return
    }

    // redirect login page
    const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
      path: PageEnum.BASE_LOGIN,
      replace: true
    }
    if (to.path) {
      redirectData.query = {
        ...redirectData.query,
        redirect: to.path
      }
    }
    next(redirectData)
    return
  }

  // Jump to the 404 page after processing the login
  // if (
  //   from.path === PageEnum.BASE_LOGIN &&
  //   to.name === PAGE_NOT_FOUND_ROUTE.name &&
  //   to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
  // ) {
  //   next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
  //   return;
  // }

  // get userinfo while last fetch time is empty
  if (userStore.lastUpdateTime === 0) {
    try {
      await userStore.getUserInfoAction()
    } catch (err) {
      next()
      return
    }
  }

  next()
  // if (permissionStore.getIsDynamicAddedRoute) {
  //   next();
  //   return;
  // }

  // const routes = await permissionStore.buildRoutesAction();
  //
  // routes.forEach((route) => {
  //   router.addRoute(route as unknown as RouteRecordRaw);
  // });
  //
  // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
  //
  // permissionStore.setDynamicAddedRoute(true);
  //
  // if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
  //   // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
  //   next({ path: to.fullPath, replace: true, query: to.query });
  // } else {
  //   const redirectPath = (from.query.redirect || to.path) as string;
  //   const redirect = decodeURIComponent(redirectPath);
  //   const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
  //   next(nextData);
  // }
})

export default router
