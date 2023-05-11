import type { RouteRecordRaw } from 'vue-router'
import { ApartmentOutlined } from '@ant-design/icons-vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/recursion-view',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '递归管理',
      icon: ApartmentOutlined,
      roles: ['read_server']
    },
    children: [
      {
        path: 'cname-force',
        name: 'cname-force',
        component: () => import('@/views/recursion-view/cname-force.vue'),
        meta: {
          title: 'cname强解',
          icon: ApartmentOutlined
        }
      },
      {
        path: 'ns-force',
        name: 'ns-force',
        component: () => import('@/views/recursion-view/ns-force.vue'),
        meta: {
          title: 'ns强解',
          icon: ApartmentOutlined
        }
      },
      {
        path: 'forward',
        name: 'forward',
        component: () => import('@/views/recursion-view/forward.vue'),
        meta: {
          title: '请求转发',
          icon: ApartmentOutlined
        }
      }
    ]
  }
]

export default routes
