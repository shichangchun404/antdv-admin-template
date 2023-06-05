<template>
  <a-layout-sider class="sider" v-model:collapsed="collapsed" collapsible>
    <a-menu
      class="menu"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <template v-for="item in openMenuList">
        <a-menu-item :key="item.path" v-if="onlyOneChild(item)">
          <template #icon>
            <component :is="item.meta.icon" />
          </template>
          <router-link :to="item.path">
            {{ item.meta.title }}
          </router-link>
        </a-menu-item>
        <SubMenu :key="item.path + '/'" :menu-info="item" :base-path="item.path" v-else />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { menuRoutes } from '@/router'
import { useUserStore } from '@/store/user'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
// @ts-ignore
import SubMenu from './SubMenu.vue'

type Meta = {
  roles?: string[]
  hide?: boolean
  title: string
  icon?: any
  onlyOne?: boolean // 仅显示一级菜单
}
type RItem = {
  name: string
  path: string
  meta: Meta
  children?: RItem[]
}
const route = useRoute()

const store = useUserStore()
const permission = store.permissionList

const selectedKeys = ref([''])
const openKeys = ref([''])
const collapsed = ref<boolean>(false)

const hasPermission = (route: RItem) => {
  let open = false
  permission.forEach((p) => {
    if (route.meta && route.meta.roles && route.meta.roles.includes(p)) {
      open = true
    }
  })
  return open
}

const showMenu = (meta: any) => {
  return !(meta && meta.hide)
}

const filterHideRouter = (list: any) => {
  let res: any[] = []
  list.forEach((item: RItem) => {
    if (showMenu(item.meta)) {
      res.push(item)
    }
    if (item.children) {
      item.children = filterHideRouter(item.children)
    }
  })
  return res
}

const filterPermissionRouter = (menuRoutes: RItem[], permission: string[]): RItem[] => {
  let openMenuList: any[] = []
  if (permission.length === 0) {
    return openMenuList
  }
  menuRoutes.forEach((route) => {
    const item: RItem = {
      name: route.name,
      path: route.path,
      meta: {
        title: route.meta?.title,
        icon: route.meta?.icon,
        onlyOne: route.meta?.onlyOne
      }
      // children: []
    }
    if (hasPermission(route)) {
      if (route.children) {
        item.children = route.children
        openMenuList.push(item)
      } else {
        openMenuList.push(item)
      }
    } else if (route.children) {
      item.children = filterPermissionRouter(route.children, permission)
      if (item.children && item.children.length) {
        openMenuList.push(item)
      }
    }
  })
  return openMenuList
}

const showMenuList = filterHideRouter(menuRoutes)
const openMenuList = filterPermissionRouter(showMenuList, permission)
// console.log('openMenuList >>>>>>>>>>>> ', openMenuList)
onMounted(() => {
  selectedKeys.value[0] = route.path
  openKeys.value = getOpenKeys()
})
const getOpenKeys = () => {
  const pathList = route.path.slice(1).split('/')
  const keys: string[] = pathList.reduce((arr: string[], cur: string) => {
    let item = `${arr.join('/')}/${cur}`
    arr.push(item)
    return arr
  }, [])
  return keys
}
const onlyOneChild = (item: RItem) => {
  return item.children && item.children.length == 1 && item.meta.onlyOne
}
</script>

<style scoped lang="less">
.sider {
  width: 200px;
  background: #fff;
  overflow-x: hidden;
  height: calc(100vh - 112px);
  .menu {
    height: 100%;
    border-right: 0;
  }
  :deep(.ant-layout-sider-trigger) {
    background-color: #ffffff;
    border-top: 1px solid #efefef;
    .anticon svg {
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
