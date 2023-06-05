import type { RouteRecordRaw } from 'vue-router'
import { ApartmentOutlined } from '@ant-design/icons-vue'

const routes: RouteRecordRaw = {
  path: '/cache',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '缓存管理',
    icon: ApartmentOutlined,
    roles: ['read_server']
  },
  children: [
    {
      path: 'strategy',
      name: 'cache-strategy',
      meta: {
        title: '策略列表',
        icon: ApartmentOutlined
      },
      component: () => import('@/layout/view.vue'),
      children: [
        {
          path: 'domain-limit',
          name: 'domain-limit',
          component: () => import('@/views/cache/strategy/domain-limit.vue'),
          meta: {
            title: '域名限速',
            icon: ApartmentOutlined
          }
        },
        {
          path: 'ip-limit',
          name: 'ip-limit',
          component: () => import('@/views/cache/strategy/domain-limit.vue'),
          meta: {
            title: 'IP限速',
            icon: ApartmentOutlined
          }
        },
        {
          path: 'domain-limit/:id',
          name: 'domain-limit-detail',
          component: () => import('@/views/cache/strategy/detail.vue'),
          meta: {
            title: '域名限速详情',
            icon: ApartmentOutlined,
            activateMenu: 'domain-limit',
            hide: true
          }
        }
      ]
    }
  ]
}

export default routes
