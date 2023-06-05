import type { RouteRecordRaw } from 'vue-router'
import { BarChartOutlined } from '@ant-design/icons-vue'

const routes: RouteRecordRaw = {
  path: '/dashboard',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '仪表盘',
    icon: BarChartOutlined,
    roles: ['read_server'],
    onlyOne: true
  },
  children: [
    {
      path: '',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {}
    }
  ]
}

export default routes
