<template>
  <page-header-wrapper content="Api管理">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="apiPage" :columns="columns">
        <template slot="status" slot-scope="scope">
          <a-badge status="success" v-if="scope.record.status" text="启用"/>
          <a-badge status="error" v-else text="禁用"/>
        </template>
        <template slot="action" slot-scope="scope">
          <a-button type="link" @click="()=>{editRow(scope.record)}">编辑</a-button>
          <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" title="确定删除"
                        @confirm="()=>{deleteMsg(removeApi(scope.record.apiId))}">
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </DataTable>
    </div>

    <ApiFormIndex ref="apiForm" />
    <span slot="extraContent">
      <a-button type="primary" size="small" @click="()=>{this.$refs.apiForm.open()}">添加</a-button>
    </span>
  </page-header-wrapper>
</template>

<script>
import {columns} from "@/views/system/api/TableAction";
import {apiPage,removeApi} from "@/api/system/api";
import DataTable from "@/views/table/DataTable";
import ApiFormIndex from "@/views/system/api/form/Index";
import {deleteMsg} from "@/utils/form";

export default {
  name: "ApiInfoIndex",
  components: {ApiFormIndex, DataTable},
  data(){
    return{
      apiPage,
      removeApi,
      columns,
      deleteMsg
    }
  },
  methods:{
    editRow(record) {
      this.$refs.apiForm.open(record);
    },
  }
}
</script>

<style scoped>

</style>
