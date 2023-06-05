<template>
  <span @click="copyText(text)" class="text-ellipsis" :title="text"
    ><copy-outlined />{{ text }}</span
  >
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useClipboard } from '@vueuse/core'
import { CopyOutlined } from '@ant-design/icons-vue'
defineProps({
  text: {
    type: String,
    default: ''
  }
})

const { copy } = useClipboard()
const copyText = (text: string) => {
  copy(text)
  message.success('复制成功')
}
</script>

<style lang="less" scoped>
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
  cursor: pointer;
  &:hover {
    color: @color-link;
  }
}
</style>
