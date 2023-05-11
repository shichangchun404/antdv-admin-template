import type { RouteRecordRaw } from 'vue-router'
import { DatabaseOutlined } from '@ant-design/icons-vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/server',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '服务器管理',
      icon: DatabaseOutlined
    },
    children: [
      {
        path: 'agent',
        name: 'agent',
        component: () => import('@/views/server/agent.vue'),
        meta: {
          title: 'agent管理',
          icon: DatabaseOutlined,
          roles: ['read_server']
        }
      },
      {
        path: 'ospf',
        name: 'ospf',
        component: () => import('@/views/server/ospf.vue'),
        meta: {
          title: 'ospf管理',
          icon: DatabaseOutlined,
          roles: ['read_server']
        }
      },
      {
        path: 'global-policy',
        name: 'global-policy',
        component: () => import('@/views/server/global-policy.vue'),
        meta: {
          title: '全局策略管理',
          icon: DatabaseOutlined,
          roles: ['read_server']
        }
      }
    ]
  }
]

export default routes
