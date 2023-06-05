<template>
  <a-config-provider :locale="zhCN">
    <RouterView></RouterView>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
h4 {
  font-weight: 600;
}
li {
  list-style: none;
}
.filter-wrap {
  padding: 20px;
  background: #fff;
  border: 1px solid @color-gray-border;
  margin-bottom: 20px;

  &.single {
    padding-bottom: 0;
  }
}
.content-wrap {
  padding: 20px;
  background: #fff;
  border: 1px solid @color-gray-border;
  .operate-wrap {
    margin-bottom: 10px;
  }
}
.page-wrap {
  display: flex;
  .page-left-wrap {
    width: 150px;
    background-color: #ffffff;
    margin-right: 10px;
    .list-content {
      margin: 5px;
      padding: 5px;
      border: 1px solid @color-gray-border;
      border-radius: 2px;
      height: 98%;
    }
    .title {
      padding: 10px 10px 0 10px;
    }
    .item {
      padding: 10px 10px 0 10px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      &.on {
        color: #1890ff;
      }
      &:hover {
        color: #1890ff;
      }
      .item-name {
        width: 100px;
        overflow: hidden;
      }
    }
  }
  .page-right-wrap {
    width: 100%;
    overflow: auto;
  }
}
.top-line {
  padding-top: 10px;
  border-top: 1px solid @color-gray-border;
}
</style>
