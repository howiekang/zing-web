<template>
  <page-header-wrapper :content="$t('menu.system.manger.module.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="getModuleList" :columns="columns" :customRow="tableEventCustom"/>
      <ModuleFormIndex ref="from"/>
    </div>
    <span slot="extraContent">
      <a-button type="primary" size="small">添加</a-button>
    </span>
  </page-header-wrapper>
</template>

<script>
import {getModuleList} from "@/api/system/module";
import {columns, tableEvent} from "@/views/system/module/TableAction";
import DataTable from "@/views/table/DataTable";
import ModuleFormIndex from "@/views/system/module/form/Index";

export default {
  name: "ModuleIndex",
  components: {ModuleFormIndex, DataTable},
  data() {
    return {
      getModuleList,
      columns
    }
  },
  methods: {
    tableEventCustom(record) {
      return tableEvent(record,this.$refs.from);
    }
  }
}
</script>

<style scoped>

</style>
