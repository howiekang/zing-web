<template>
  <s-table
      ref="table"
      size="default"
      rowKey="key"
      :customRow="tableCustomRow"
      :columns="columns"
      :data="loadData"
      :alert="true"
      :rowSelection="rowSelection"
      showPagination="auto"
  >
      <span slot="avatar" slot-scope="text, record, index">
        <a-avatar :src="text"/>
      </span>
    <span slot="badge" slot-scope="text, record, index">
        <a-badge status="success" text="启用" v-if="text"/>
        <a-badge status="error" text="禁用" v-else/>
      </span>
    <span slot="action" slot-scope="text, record, index" v-if="actionSpaceShow[index].status">
        <a-space>
          <a-button type="danger" size="small" v-if="record.isEnable">禁用</a-button>
          <a-button type="primary" size="small" v-else>启用</a-button>
          <a-button type="primary" size="small">角色</a-button>
          <a-button type="danger" size="small">删除</a-button>
        </a-space>
      </span>
    <span slot="table-action-title">
          <a-space>
            <a-icon type="loading" v-if="tableLoading"/>
            <a-icon type="reload" v-else @click="(e)=>loadData"/>

            <a-icon type="export" v-if="menuExportShow" @click="(e)=>menuListClick(false)"/>
            <a-icon type="import" v-else @click="(e)=>menuListClick(true)"/>
          </a-space>
        </span>
  </s-table>
</template>

<script>

import {STable} from "@/components";
import {getUserList} from "@/api/system/user";
import {getPageParam} from "@/utils/util";

const columns = [
  {
    title: "昵称",
    dataIndex: 'nick'
  },
  {
    title: "头像",
    dataIndex: 'headImageUrl',
    scopedSlots: {customRender: 'avatar'}
  },
  {
    title: "姓名",
    dataIndex: 'userName'
  },
  {
    title: "手机号",
    dataIndex: 'telPhone'
  },
  {
    title: "邮箱",
    dataIndex: 'email'
  },
  {
    title: "状态",
    dataIndex: 'status',
    scopedSlots: {customRender: 'badge'}
  },
  {
    title: "注册时间",
    dataIndex: 'regTime'
  },
  {
    fixed: "right",
    align: 'center',
    scopedSlots: {
      customRender: 'action',
      title: 'table-action-title'
    }
  }
]

export default {
  name: "DataTable",
  components: {
    STable,
  },
  data() {
    return {
      columns: columns,
      loadData: parameter => {
        this.tableLoading = true;
        return getUserList(getPageParam(parameter)).then(res => {
          if (res.result && res.result.data) {
            for (let i = 0; i < res.result.data.length; i++) {
              this.actionSpaceShow.push({
                id: res.result.data[i].id,
                status: true
              })
            }
          }
          this.tableLoading = false;
          return res.result
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      actionSpaceShow: [],
      menuExportShow: true,
      tableLoading: false
    }
  },
  methods: {
    tableCustomRow(record, index) {
      return {
        on: {
          dblclick: (e) => {
            //首先观察rowKey是否存在
            let elIndex = this.selectedRowKeys.indexOf(index), rowExits;
            if (elIndex >= 0) {
              this.selectedRowKeys.splice(elIndex, 1);
            } else {
              this.selectedRowKeys.push(index)
            }

            for (let i = 0; i < this.selectedRows.length; i++) {
              if (this.selectedRows[i].id === record.id) {
                this.selectedRows.splice(i, 1)
                rowExits = true
              }
            }
            if (!rowExits) {
              this.selectedRows.push(record)
            }

          }
        }
      }
    },
    menuListClick(status) {
      for (let i = 0; i < this.actionSpaceShow.length; i++) {
        this.actionSpaceShow[i].status = status;
      }
      this.menuExportShow = status;
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  }
}
</script>

<style scoped>

</style>
