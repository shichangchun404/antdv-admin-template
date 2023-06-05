import { defineStore } from 'pinia'
import { PermissionEnum } from '@/enum/permissionEnum'
import { getUserInfo, login, logout } from '@/api/api.user'
import { PERMISSIONS_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enum/cacheEnum'
import { getSession, removeSession, setSession } from '@/utils/cache'
import { isArray } from '@/utils/is'
import { LoginParams } from '@/api/model/userModel'
import router from '@/router'
import { PageEnum } from '@/enum/pageEnum'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  permissionList: PermissionEnum[]
  sessionTimeout?: boolean
  lastUpdateTime?: number
}

export interface UserInfo {
  userId: string | number
  username: string
  realName?: string
  avatar?: string
  desc?: string
  homePath?: string
  permission?: PermissionEnum[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: '',
    permissionList: [],
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(state): UserInfo {
      return state.userInfo || getSession<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(state): string {
      return state.token || getSession<string>(TOKEN_KEY)
    },
    getPermissionList(state): PermissionEnum[] {
      return state.permissionList.length > 0
        ? state.permissionList
        : getSession<PermissionEnum[]>(PERMISSIONS_KEY)
    }
  },
  actions: {
    setToken(info: string) {
      this.token = info
      setSession(TOKEN_KEY, info)
    },
    setPermissionList(permissionList: PermissionEnum[]) {
      this.permissionList = permissionList
      // setSession(PERMISSIONS_KEY, permissionList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      // setSession(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.permissionList = []
    },
    /**
     * login
     * @param params
     */
    async login(
      params: LoginParams & {
        goHome?: boolean
      }
    ): Promise<UserInfo | null> {
      try {
        const { goHome = true, ...loginParams } = params
        const data = await login(loginParams)
        const { token } = data

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<UserInfo | null> {
      if (!this.getToken) return null
      // get user info
      const userInfo = await this.getUserInfoAction()
      // const sessionTimeout = this.sessionTimeout;
      // if (sessionTimeout) {
      //   this.setSessionTimeout(false);
      // } else {
      //   const permissionStore = usePermissionStore();
      //   if (!permissionStore.isDynamicAddedRoute) {
      //     const routes = await permissionStore.buildRoutesAction();
      //     routes.forEach((route) => {
      //       router.addRoute(route as unknown as RouteRecordRaw);
      //     });
      //     router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
      //     permissionStore.setDynamicAddedRoute(true);
      //   }
      goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
      // }
      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { permission = [] } = userInfo
      if (isArray(permission)) {
        this.setPermissionList(permission)
      } else {
        this.setPermissionList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await logout()
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken('')
      removeSession(TOKEN_KEY)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    }
  }
})
