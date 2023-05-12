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
          <template v-for="i in 10" :key="i">
            <a-col v-show="expand || i <= 6" :span="8">
              <a-form-item
                :name="`field-${i}`"
                :label="`field-${i}`"
                :rules="[{ required: true, message: 'input something' }]"
              >
                <a-input
                  v-model:value="formState[`field-${i}`]"
                  placeholder="placeholder"
                ></a-input>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="resetFields()">重置</a-button>
            <a style="font-size: 12px" @click="expand = !expand">
              <template v-if="expand">
                <UpOutlined />
              </template>
              <template v-else>
                <DownOutlined />
              </template>
              {{ expand ? '收起' : '展开' }}
            </a>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="content-wrap">
      <div class="operate-wrap">
        <a-row>
          <a-col :span="4" style="text-align: left"> 列表 </a-col>
          <a-col :span="20" style="text-align: right">
            <a-button style="margin: 0 8px" @click="add()" type="primary">新增</a-button>
            <a-button danger html-type="submit">清除缓存</a-button>
          </a-col>
        </a-row>
      </div>
      <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'

const route = useRoute()

const expand = ref(false)
const formRef = ref<FormInstance>()

interface FormItem {
  [key: string]: any
}
const formState = reactive<FormItem>({})

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
const resetFields = () => {
  // @ts-ignore
  formRef.resetFields()
}
const add = () => {}
</script>

<style scoped lang="less"></style>
