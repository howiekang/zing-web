<template>
  <page-header-wrapper :content="$t('menu.system.manger.module.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="menuPage" :columns="columns" :custom-row="tableEvent">
        <template slot="status" slot-scope="scope">
          <a-badge status="success" v-if="scope.record.status" text="启用"/>
          <a-badge status="error" v-else text="禁用"/>
        </template>
        <template slot="action" slot-scope="scope">
          <a-button type="link" @click="()=>{editRow(scope.record)}" v-action:edit>编辑</a-button>
          <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" title="确定删除"
                        @confirm="()=>{deleteMsg(removeMenu(scope.record.id))}">
            <a-button type="link" v-action:delete>删除</a-button>
          </a-popconfirm>
        </template>
      </DataTable>
      <MenuFormIndex ref="from"/>
      <MenuPermits ref="menuPermits"/>
    </div>
    <span slot="extraContent">
      <a-space>
        <a-button
            type="primary"
            size="small"
            @click="()=>{this.$refs.from.open()}">
          添加
        </a-button>
        <a-button
            type="primary"
            size="small"
            @click="()=>{this.$refs.menuPermits.open()}">
          权限分配
        </a-button>
      </a-space>
    </span>
  </page-header-wrapper>
</template>

<script>
import {menuPage, removeMenu} from "@/api/system/module";
import {columns} from "@/views/system/module/TableAction";
import DataTable from "@/views/table/DataTable";
import MenuFormIndex from "@/views/system/module/form/Index";
import store from "@/store";
import {deleteMsg} from "@/utils/form";
import MenuPermits from "@/views/system/module/permits/MenuPermits";

export default {
  name: "ModuleIndex",
  components: {MenuPermits, MenuFormIndex, DataTable},
  data() {
    return {
      menuPage,
      columns,
      store,
      removeMenu,
      deleteMsg
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
