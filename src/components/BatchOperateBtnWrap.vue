<template>
  <div class="operate-wrap">
    <a-row>
      <a-col :span="4" style="text-align: left"></a-col>
      <a-col :span="20" style="text-align: right">
        <a-button
          v-if="onBatchSubmit"
          @click="onBatchSubmit"
          type="primary"
          style="margin-right: 8px"
          :disabled="!selectedRowsRef.length"
          :title="!selectedRowsRef.length ? '请选择数据' : null"
          >批量处理</a-button
        >
        <a-button
          v-if="onBatchDelete"
          danger
          type="primary"
          style="margin-right: 8px"
          @click="onBatchDelete()"
          :disabled="!selectedRowsRef.length"
          :title="!selectedRowsRef.length ? '请选择数据' : null"
          >批量删除</a-button
        >
        <a-button
          v-if="onBatchCreate"
          @click="onBatchCreate()"
          type="primary"
          style="margin-right: 8px"
          >批量新增</a-button
        >
        <a-button @click="onAdd()" type="primary">新增</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
defineProps({
  selectedRowsRef: {
    type: Array<IStrategyTableItem>,
    default: () => []
  },
  onBatchSubmit: {
    type: Function
  },
  onBatchDelete: {
    type: Function
  },
  onBatchCreate: {
    type: Function
  },
  onAdd: {
    type: Function,
    required: true
  }
})
</script>
