<template>
  <a-layout class="layout-wrap">
    <LayoutHeader></LayoutHeader>
    <a-layout>
      <LayoutSider></LayoutSider>
      <a-layout-content class="main">
        <RouterView></RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutSider from './components/LayoutSider.vue'
</script>

<style lang="less" scoped>
.layout-wrap {
  height: 100%;
  .main {
    padding: 20px;
    overflow: auto;
  }
}
</style>
