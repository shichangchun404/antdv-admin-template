<template>
  <a-layout class="layout-wrap">
    <LayoutHeader></LayoutHeader>
    <a-layout>
      <LayoutSider></LayoutSider>
      <a-layout-content class="main">
        <!-- <RouterView></RouterView> -->
        <RouterView>
          <template #default="{ Component, route }">
            <transition name="slide-fade" mode="out-in" appear>
              <div>
                <component :is="Component" :key="route.fullPath" />
              </div>
            </transition>
          </template>
        </RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutSider from './components/LayoutSider.vue'
</script>

<style lang="less">
.layout-wrap {
  height: 100%;
  .main {
    padding: 20px;
    overflow: auto;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
