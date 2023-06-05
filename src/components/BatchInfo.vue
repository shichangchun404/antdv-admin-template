<script setup lang="ts">

const props = defineProps({
  columns: { type: Array, required: true },
  dataSource: { type: Array, required: true },
  alertMessage: { type: String, required: true }
})

</script>

<template>
  <a-alert :message="props.alertMessage" type="warning" show-icon style="margin-bottom: 10px" />
  <a-table size="small" :dataSource="props.dataSource" :columns="props.columns" :pagination="false" >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'canDelete'">
        <span v-if="!record.serverNum">是</span>
        <span v-else style="color: red;">否</span>
      </template>
    </template>
  </a-table>
</template>

<style scoped lang="less"></style>
