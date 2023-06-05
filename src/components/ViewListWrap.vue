<template>
  <div class="page-left-wrap">
    <div class="list-content">
      <h6 class="title">{{ title }}</h6>
      <ul class="list">
        <li
          v-for="(item, i) in viewList"
          :class="selectedIndex == i ? 'item on' : 'item'"
          :key="i"
          @click="onSelectIndex(i as number, item)"
        >
          <span class="item-name">{{ item[fieldNames.name] }}</span>
          <span>{{ item[fieldNames.total] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Field {
  name: string
  total: string
}

interface Props {
  title?: string
  viewList: any
  fieldNames?: Field
}

const props = withDefaults(defineProps<Props>(), {
  title: 'VIEW列表',
  viewList: () => [],
  fieldNames: () => ({ name: 'viewName', total: 'total'})
})
const selectedIndex = ref(0)
const emits = defineEmits(['selected'])
const onSelectIndex = (i: number, item: IStrategyViewItem) => {
  selectedIndex.value = i
  emits('selected', item)
}
</script>
