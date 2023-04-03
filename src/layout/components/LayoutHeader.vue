<template>
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/vue.svg" alt="">
        <h3 class="title">DNS管理平台</h3>
      </div>
      <div class="menu">
        <a-menu class="left" mode="horizontal">
          <a-menu-item key="1">活动</a-menu-item>
          <a-menu-item key="2">警告</a-menu-item>
          <a-menu-item key="3">流量</a-menu-item>
        </a-menu>
        
        <div class="right">
          <a-badge count="5" :overflow-count="10" class="item">
            未读消息
          </a-badge>
          <a-dropdown class="item">
            <a class="ant-dropdown-link" @click.prevent>
              <span class="username">{{store.username}}</span>
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
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

<script setup lang='ts'>
import { DownOutlined } from '@ant-design/icons-vue';
import { useUserStore } from "@/store/user"
import { removeToken } from '@/utils/auth'

const store = useUserStore()
const logout = () => {
  removeToken()
  window.location.href = '/login'
}
</script>

<style scoped lang='less'>
  .header{
    background: #fff;
    cursor: pointer;
    .logo {
      float: left;
      width: 200px;
      padding-left: 20px;
      display: flex;
      align-items: center;
      img{
        height: 30px;
      }
      .title{
        margin-left: 10px;
      }
    }
    .menu{
      display: flex;
      justify-content: space-between;
      margin-right: 20px;
      .left{
        line-height: 64px;
      }
      .right{
        .item{
          margin-left: 20px;
          .username{
            padding-right: 5px
          }
        }
      }
    }
  }
</style>