<template>
  <a-sub-menu :key="basePath">
    <template #title>
      <component :is="props.menuInfo?.meta.icon" />
      <span>{{ props.menuInfo?.meta.title }}</span>
    </template>
    <template v-for="item in props.menuInfo?.children">
      <template v-if="!item.children">
        <!-- 具有详情页 高亮展示 -->
        <a-menu-item v-if="activateMenu && item.path == activateMenu" :key="`${currPath}`">
          <router-link :to="`${basePath}/${item.path}`">
            <component :is="item.meta.icon" />
            {{ item.meta.title }}
          </router-link>
        </a-menu-item>
        <!-- 普通模式 -->
        <a-menu-item :key="`${basePath}/${item.path}`" v-else>
          <router-link :to="`${basePath}/${item.path}`">
            <component :is="item.meta.icon" />
            {{ item.meta.title }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu
          :menu-info="item"
          :base-path="`${basePath}/${item.path}`"
          :key="`${basePath}/${item.path}`"
        />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  menuInfo: {
    type: Object,
    defaul: {}
  },
  basePath: {
    type: String,
    default: '/'
  }
})

// 处理不在菜单展示的详情路由
const activateMenu = ref('')
const currPath = ref('')
const router = useRouter()
watch(
  () => router.currentRoute.value,
  (nv) => {
    // @ts-ignore
    activateMenu.value = nv.meta.activateMenu || ''
    currPath.value = nv.path
  },
  { immediate: true }
)
</script>
<script lang="ts">
export default {
  name: 'SubMenu'
}
</script>

<style scoped lang="less"></style>
