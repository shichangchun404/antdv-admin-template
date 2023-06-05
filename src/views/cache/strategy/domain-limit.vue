<template>
  <a-spin :spinning="loading" tip="加载中...">
    <div class="page-wrap">
      <ViewListWrap @selected="handerSelected" :viewList="viewList"></ViewListWrap>
      <div class="page-right-wrap">
        <div class="filter-wrap">
          <a-form
            ref="formRef"
            name="advanced_search"
            class="ant-advanced-search-form"
            :model="searchParam"
          >
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item name="originUrl" label="域名">
                  <a-input v-model:value="searchParam.domian" placeholder="请输入域名"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item name="status" label="状态">
                  <a-select ref="select" v-model:value="searchParam.status" :options="statusList">
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item name="origin" label="来源">
                  <a-select ref="select" v-model:value="searchParam.origin" :options="originList">
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6" style="text-align: right">
                <a-button style="margin: 0 8px" @click="onResetFields()">重置</a-button>
                <a-button type="primary" @click="onQueryList()"> 查询</a-button>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="content-wrap">
          <BatchOperateBtnWrap
            :selectedRowsRef="selectedRowsRef"
            :onBatchSubmit="onBatchSubmit"
            :onBatchDelete="onBatchDelete"
            :onAdd="onAdd"
          ></BatchOperateBtnWrap>
          <a-table
            v-if="!loading"
            :columns="columnList"
            :data-source="tableData.list"
            :row-selection="rowSelection"
            :scroll="{ x: 600 }"
            rowKey="id"
            :pagination="{
              current: searchParam.pageNum,
              pageSize: searchParam.pageSize,
              total: tableData.total,
              showQuickJumper: true,
              onChange: onPagerChange,
              showTotal: (total:number, range:number[]) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`
            }"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'id'">
                <WithCopyColumn :text="text"></WithCopyColumn>
              </template>

              <template v-if="column.dataIndex === 'status'">
                <a-badge color="green" text="正常" v-if="text == StatusEnum.NORMAL" />
                <a-badge color="red" text="未使用" v-if="text == StatusEnum.UNUSE" />
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <a-button type="link" @click="onEdit(record)">编辑</a-button>
                <a-button danger type="link" @click="onOperate(OperateEnum.DELETET, record)"
                  >删除</a-button
                >
                <a-button
                  type="link"
                  v-if="record.status == StatusEnum.NORMAL"
                  @click="onOperate(OperateEnum.STOP, record)"
                  >停用</a-button
                >
                <a-button
                  type="link"
                  v-if="record.status == StatusEnum.UNUSE"
                  @click="onOperate(OperateEnum.SUBMIT, record)"
                  >下发</a-button
                >
              </template>
            </template>
          </a-table>
        </div>
      </div>
      <CreateOrUpdateModal
        ref="addModalRef"
        :viewList="viewList"
        @refreshList="onQueryList"
      ></CreateOrUpdateModal>
      <BatchOperateModal
        ref="batchModalRef"
        :selectedRows="selectedRowsRef"
        :selectColumns="selectColumnList"
        :postDelete="postDelete"
        :postManage="postManage"
        @refreshList="onQueryList"
      ></BatchOperateModal>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getViewList } from '@/api/view'
import { OperateEnum, StatusEnum } from '@/enum/strategyEnum'
import { selectColumnList, statusList, originList } from '@/const/strategy'
import { useStrategyList } from '@/hooks/useStrategyHooks'
import ViewListWrap from '@/components/ViewListWrap.vue'
import WithCopyColumn from '@/components/WithCopyColumn.vue'
import BatchOperateBtnWrap from '@/components/BatchOperateBtnWrap.vue'
import BatchOperateModal from '@/components/BatchOperateModal.vue'
import CreateOrUpdateModal from '../components/DomainLimitCreateModal.vue'
import { columnList } from '@/const/domainLimit.column'
import { getList, postDelete, postManage } from '@/api/domainLimit.api'

const searchParam = reactive({
  domian: '',
  status: null,
  origin: null,
  effectView: '',
  pageNum: 1,
  pageSize: 10
})

const {
  loading,
  viewList,
  formRef,
  addModalRef,
  batchModalRef,
  tableData,
  selectedRowsRef,
  rowSelection,
  getViewData,
  onQueryList,
  onResetFields,
  onAdd,
  onEdit,
  onBatchDelete,
  onBatchSubmit,
  handerSelected,
  onOperate,
  onPagerChange
} = useStrategyList(searchParam, getList, getViewList, postDelete, postManage)

onMounted(() => {
  getViewData()
})
</script>
