<template>
  <page-header-wrapper :content="$t('menu.system.manger.user.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="userPage" :columns="columns" :custom-row="tableEvent">
        <span slot="avatar" slot-scope="text, record, index">
          <a-avatar :src="text"/>
        </span>
        <template slot="status" slot-scope="scope">
          <a-badge status="success" v-if="scope.record.status" text="启用"/>
          <a-badge status="error" v-else text="禁用"/>
          <UserDetail ref="userDetail" :user-info="scope.record"/>
        </template>
      </DataTable>
    </div>
  </page-header-wrapper>
</template>

<script>
import DataTable from "@/views/table/DataTable";
import {userPage} from "@/api/system/user";
import {columns} from "@/views/system/user/TableAction";
import UserDetail from "@/views/system/user/detail/UserDetail";

export default {
  name: "UserIndex",
  components: {UserDetail, DataTable},
  data() {
    return {
      userPage,
      columns
    }
  },
  methods: {
    tableEvent(record){
      return {
        on: {
          click: (event) => {
            this.$refs.userDetail.open();
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
