<template>
  <page-header-wrapper :content="$t('menu.system.manger.module.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="getModuleList" :columns="columns" :custom-row="tableEvent">
        <template slot="status" slot-scope="scope">
          <a-badge status="success" v-if="scope.record.status" text="启用"/>
          <a-badge status="error" v-else text="禁用"/>
        </template>
        <template slot="action" slot-scope="scope">
          <a-button type="link" @click="()=>{editRow(scope.record)}">编辑</a-button>
          <a-popconfirm placement="top" ok-text="确定" cancel-text="取消" title="确定删除"
                        @confirm="()=>{showMsg(removeModule(scope.record.id))}">
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </template>
        <template slot="function" slot-scope="scope">
          <template v-if="scope.record.functionRests" v-for="func in scope.record.functionRests">
            <a-tag>{{ func.funcName }}</a-tag>
          </template>
        </template>
      </DataTable>
      <ModuleFormIndex ref="from"/>
    </div>
    <span slot="extraContent">
      <a-button :style="{backgroundColor:btnColor}" type="primary" size="small" @click="()=>{this.$refs.from.open()}">添加</a-button>
    </span>
  </page-header-wrapper>
</template>

<script>
import {getModuleList, removeModule} from "@/api/system/module";
import {columns} from "@/views/system/module/TableAction";
import DataTable from "@/views/table/DataTable";
import ModuleFormIndex from "@/views/system/module/form/Index";
import store from "@/store";
import {showMsg} from "@/utils/request";
import { mapState } from 'vuex';

export default {
  name: "ModuleIndex",
  components: {ModuleFormIndex, DataTable},
  data() {
    return {
      getModuleList,
      columns,
      store,
      removeModule,
      showMsg
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
  },
  computed: {
    ...mapState({
      btnColor: state => state.app.color
    })
  }
}
</script>

<style scoped>

</style>
