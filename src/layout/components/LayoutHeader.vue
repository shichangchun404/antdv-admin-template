<template>
  <a-layout-header class="header">
    <div class="logo">
      <img src="@/assets/images/ytlogo.png" alt="" />
      <h3 class="title">DNS管理平台</h3>
    </div>
    <div class="menu">
      <a-menu class="left" mode="horizontal">
        <a-menu-item key="1">活动</a-menu-item>
        <a-menu-item key="2">警告</a-menu-item>
        <a-menu-item key="3">流量</a-menu-item>
      </a-menu>

      <div class="right">
        <a-badge count="555" :overflow-count="10" class="item badge" :offset="[10, -5]">
          <BellOutlined :style="{ fontSize: '16px' }"></BellOutlined>
        </a-badge>
        <a-dropdown class="item">
          <a class="ant-dropdown-link" @click.prevent>
            <img class="user-avatar" src="@/assets/images/ytlogo.png" />
            <span class="username">{{ store.username }}</span>
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu class="logout-wrap">
              <a-menu-item>
                <a href="javascript:;" @click="logout">退出</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { DownOutlined, BellOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/store/user'
import { removeToken } from '@/utils/auth'

const store = useUserStore()
const logout = () => {
  removeToken()
  window.location.href = '/login'
}
</script>

<style scoped lang="less">
.header {
  background: #fff;
  cursor: pointer;
  border-bottom: 1px solid @color-gray-border;
  .logo {
    float: left;
    width: 200px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    img {
      height: 30px;
    }
    .title {
      margin-left: 10px;
    }
  }
  .menu {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    .left {
      border-bottom: 1px solid @color-gray-border;
    }
    .right {
      .item {
        margin: 0 20px;
      }
      .user-avatar {
        width: 30px;
        border-radius: 15px;
      }
      .username {
        padding: 5px;
      }
    }
  }
}
.logout-wrap {
  margin-top: 20px;
}
</style>
