<template>
  <a-layout class="layout-wrap">
    <LayoutHeader></LayoutHeader>
    <a-layout>
      <LayoutSider></LayoutSider>
      <LayoutContent></LayoutContent>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutSider from './components/LayoutSider.vue'
import LayoutContent from './components/LayoutContent.vue'
</script>

<style lang="less" scoped>
.layout-wrap {
  height: 100%;
}
</style>
