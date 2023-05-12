<template>
  <div>
    <h4>{{ route.meta.title }}</h4>
    <div class="filter-wrap">
      <a-form
        ref="formRef"
        name="advanced_search"
        class="ant-advanced-search-form"
        :model="formState"
        @finish="onFinish"
      >
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="ip" label="IP">
              <a-input v-model:value="formState.ip" placeholder="请输入IP"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button style="margin: 0 8px" @click="onResetFields()">重置</a-button>
            <a-button type="primary" @click="onQuery()">查询</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="content-wrap">
      <div class="operate-wrap">
        <a-row>
          <a-col :span="4" style="text-align: left"> Agent列表 </a-col>
          <a-col :span="20" style="text-align: right">
            <a-button style="margin: 0 8px" @click="onAdd()" type="primary">新增</a-button>
            <a-button danger @click="onClearCanch()">清除缓存</a-button>
          </a-col>
        </a-row>
      </div>
      <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <a-button class="table-btn">编辑</a-button>
            <a-popconfirm v-if="data.length" title="确定删除?" @confirm="onDelete(record.key)">
              <a-button danger>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import type { FormInstance } from 'ant-design-vue'

const route = useRoute()
const formRef = ref<FormInstance>()

interface FormItem {
  ip: string
}
const formState = reactive<FormItem>({
  ip: ''
})

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: 180
  }
])

const data = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '11',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '12',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser']
  },
  {
    key: '13',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
])

const onFinish = (values: any) => {
  console.log('Received values of form: ', values)
  console.log('formState: ', formState)
}

const onQuery = () => {}
const onResetFields = () => {
  ;(formRef.value as FormInstance).resetFields()
}

const onAdd = () => {}
const onEdit = (key: string) => {}
const onDelete = (key: string) => {
  console.log(key)
}
const onClearCanch = () => {}
</script>

<style scoped lang="less"></style>
