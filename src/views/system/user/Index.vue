<template>
  <page-header-wrapper :content="$t('menu.system.manger.user.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="getUserList" :columns="columns" :custom-row="tableEvent">
        <span slot="avatar" slot-scope="text, record, index">
          <a-avatar :src="text"/>
        </span>
        <template slot="status" slot-scope="scope">
          <a-badge status="success" v-if="scope.record.status" text="启用"/>
          <a-badge status="error" v-else text="禁用"/>
        </template>
      </DataTable>
      <UserDetail ref="userDetail"/>
    </div>
  </page-header-wrapper>
</template>

<script>
import DataTable from "@/views/table/DataTable";
import {getUserList} from "@/api/system/user";
import {columns} from "@/views/system/user/TableAction";
import UserDetail from "@/views/system/user/detail/UserDetail";

export default {
  name: "UserIndex",
  components: {UserDetail, DataTable},
  data() {
    return {
      getUserList,
      columns
    }
  },
  methods: {
    tableEvent(){
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
