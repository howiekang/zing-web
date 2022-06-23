<template>
  <page-header-wrapper :content="$t('menu.system.manger.role.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="rolePage" :columns="columns">
        <template slot="status" slot-scope="scope">
          <a-badge status="success" v-if="scope.record.status" text="启用"/>
          <a-badge status="error" v-else text="禁用"/>
        </template>
        <template slot="action" slot-scope="scope">
          <a-button type="link" @click="()=>{editRow(scope.record)}">编辑</a-button>
          <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" title="确定删除" @confirm="()=>{showMsg(removeRole(scope.record.id))}">
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </DataTable>
      <RoleFormIndex ref="from"/>
    </div>
    <span slot="extraContent">
      <a-button type="primary" size="small" @click="()=>{this.$refs.from.open()}">添加</a-button>
    </span>
  </page-header-wrapper>
</template>

<script>
import {columns} from "@/views/system/role/TableAction";
import {rolePage,removeRole} from "@/api/system/role";
import DataTable from "@/views/table/DataTable";
import {showMsg} from "@/utils/request";
import RoleFormIndex from "@/views/system/role/form/Index";

export default {
  name: "RoleIndex",
  components: {RoleFormIndex,DataTable},
  data() {
    return {
      rolePage,
      columns,
      removeRole,
      showMsg
    }
  },
  methods:{
    editRow(record) {
      this.$refs.from.open(record);
    }
  }
}
</script>

<style scoped>

</style>
