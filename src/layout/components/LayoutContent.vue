<template>
    <a-layout class="content">
        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>
                <h3>{{route.meta.title}}</h3>
            </a-breadcrumb-item>
            
        </a-breadcrumb>
        <a-layout-content class="main">
            <RouterView></RouterView>
        </a-layout-content>
    </a-layout>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang='less'>
.content{
    padding: 0 24px 24px;
    .main{
        background: #fff;
        padding: 24px;
        margin: 0;
        min-height: calc(100% - 60px);
        overflow: auto;
    }
    
  }
</style>