import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      username: '', // 用户名
      nickname: '', // 昵称
      permission: [] // 菜单权限列表
    }
  },
})
