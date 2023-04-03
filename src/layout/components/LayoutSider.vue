<template>
    <a-layout-sider class="sider" v-model:collapsed="collapsed" collapsible>
        <a-menu class="menu" mode="inline"
            v-model:selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
        >
            <a-sub-menu :key="index" v-for="(item,index) in openMenuList">
                <template #title>
                    <component :is="item.icon" />
                    <span>{{item.title}}</span>
                </template>
                
                <a-menu-item :key="it.path" v-for="it in item.children">
                    <router-link :to="fullPath(item.path, it.path)">
                        <component :is="it.meta.icon" />
                        {{it.meta.title}} 
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
            
        </a-menu>
    </a-layout-sider>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { menuRoutes } from '@/router'
import type { RouteRecordRaw } from "vue-router"
import { useUserStore } from "@/store/user"

const store = useUserStore()
const permission = store.permission

const selectedKeys = ref<number[]>([0])
const openKeys = ref<number[]>([0])
const collapsed = ref<boolean>(false)

const hasPermission = (l: any)=>{
    let open = false
    permission.forEach(p => {
        if(l.meta && l.meta.roles && (l.meta.roles as string[]).includes(p)){
            // @ts-ignore
            open = true
        }
    })
    return open
}

const filterRouter = (menuRoutes: RouteRecordRaw[], permission: string[]): any[] =>{
    let openMenuList:any[] = []
    if(permission.length === 0){
        return openMenuList
    }
    menuRoutes.forEach((l1) => {
        const item = {
            title: l1.meta?.title,
            icon: l1.meta?.icon,
            path: l1.path,
            children: []
        }
        if(hasPermission(l1)){ // 一级路径具有权限 子路由全量加入
            // @ts-ignore
            item.children = l1.children
        }else{ // 遍历子路由 单独添加
            l1.children?.forEach(l2 => {
                if(hasPermission(l2)){
                    // @ts-ignore
                    item.children.push(l2)
                }
            })
        }
        openMenuList.push(item)
    })
    // 过滤掉二级路由全部为空的一级菜单
    openMenuList = openMenuList.filter(item => item.children.length)
    return openMenuList
}

const fullPath = (base:string, path:string):string => {
    return `${base}/${path}`
}
const openMenuList = filterRouter(menuRoutes, permission)

</script>

<style scoped lang='less'>
.sider{
    width: 200px;
    background:#fff;
    .menu{
        height: '100%';
        border-right: 0;
    }
}
</style>