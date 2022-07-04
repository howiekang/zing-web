<template>
  <page-header-wrapper :content="$t('menu.system.manger.module.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="funcPage" :columns="columns" :custom-row="tableEvent">
        <template slot="status" slot-scope="scope">
          <a-badge status="success" v-if="scope.record.status" text="启用"/>
          <a-badge status="error" v-else text="禁用"/>
        </template>
        <template slot="action" slot-scope="scope">
          <a-button type="link" @click="()=>{editRow(scope.record)}" v-action:edit>编辑</a-button>
          <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" title="确定删除">
            <a-button type="link" v-action:delete>删除</a-button>
          </a-popconfirm>
        </template>
      </DataTable>

      <FunctionForm ref="from"/>
    </div>
    <span slot="extraContent">
      <a-space>
        <a-button
            type="primary"
            size="small"
            @click="()=>{this.$refs.from.open()}">
          添加
        </a-button>
      </a-space>
    </span>
  </page-header-wrapper>
</template>

<script>
import {funcPage} from "@/api/system/function";
import FunctionForm from "@/views/system/function/FunctionForm";
import DataTable from "@/views/table/DataTable";

export const columns = [
  {
    title: "名字",
    dataIndex: 'name'
  },
  {
    title: "代码",
    dataIndex: 'code'
  },
  {
    title: "状态",
    dataIndex: 'status',
    scopedSlots: {customRender: 'status'}
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'}
  }
]

export default {
  name: "FunctionIndex",
  components: {FunctionForm,DataTable},
  data() {
    return {
      funcPage,
      columns
    }
  },
  methods: {
    editRow(record) {
      this.$refs.from.open(record);
    },
    tableEvent(record) {
      return {
        on: {
          dblclick: (event) => {
            this.$refs.from.open();
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
