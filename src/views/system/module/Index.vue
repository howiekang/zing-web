<template>
  <page-header-wrapper :content="$t('menu.system.manger.module.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="getModuleList" :columns="columns" :custom-row="tableEvent">
        <template slot="action" slot-scope="text, record">
          <a-button type="link">编辑</a-button>
          <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" title="确定删除" >
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </DataTable>
      <ModuleFormIndex ref="from"/>
    </div>
    <span slot="extraContent">
      <a-button type="primary" size="small" @click="()=>{this.$refs.from.open()}">添加</a-button>
    </span>
  </page-header-wrapper>
</template>

<script>
import {getModuleList} from "@/api/system/module";
import {columns, tableEventCustom} from "@/views/system/module/TableAction";
import DataTable from "@/views/table/DataTable";
import ModuleFormIndex from "@/views/system/module/form/Index";
import store from "@/store";

export default {
  name: "ModuleIndex",
  components: {ModuleFormIndex, DataTable},
  data() {
    return {
      getModuleList,
      columns,
      store
    }
  },
  methods: {
    tableEvent(record) {
      return tableEventCustom(record,this.$refs.from);
    }
  }
}
</script>

<style scoped>

</style>
