import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] =  [
    {
      path: '/',
      redirect: 'home',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: 'home',
          component: () => import("@/views/home/index.vue"),
          meta: {
            title: "首页"
          },
        },
      ]
    }, 
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
      meta: {
        title: "登录"
      },
    },
  ]

export default routes