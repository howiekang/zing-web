<template>
  <page-header-wrapper :content="$t('menu.system.manger.user.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="getUserList" :columns="columns">
        <span slot="avatar" slot-scope="text, record, index">
          <a-avatar :src="text"/>
        </span>
        <template slot="status" slot-scope="scope">
          <a-badge status="success" v-if="scope.record.status" text="启用"/>
          <a-badge status="error" v-else text="禁用"/>
        </template>
        <template slot="action" slot-scope="scope">
          <RoleListPopover ref="roleListPopover" placement="left">
            <template slot="contentWrapper">
              <a-button type="link">角色</a-button>
            </template>
          </RoleListPopover>
        </template>
      </DataTable>
    </div>
  </page-header-wrapper>
</template>

<script>
import DataTable from "@/views/table/DataTable";
import {getUserList} from "@/api/system/user";
import {columns} from "@/views/system/user/TableAction";
import RoleListPopover from "@/views/system/role/list/RoleList";

export default {
  name: "UserIndex",
  components: {DataTable,RoleListPopover},
  data() {
    return {
      getUserList,
      columns
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
