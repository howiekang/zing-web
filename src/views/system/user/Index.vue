<template>
  <page-header-wrapper :content="$t('menu.system.manger.user.page-header-content.desc')">
    <div style="background-color: #ffffff">
      <DataTable :dataAction="getUserList" :columns="columns">
        <span slot="avatar" slot-scope="text, record, index">
          <a-avatar :src="text"/>
        </span>
      </DataTable>
    </div>
  </page-header-wrapper>
</template>

<script>
import DataTable from "@/views/table/DataTable";
import {getUserList} from "@/api/system/user";
import {columns} from "@/views/system/user/TableAction";

export default {
  name: "UserIndex",
  components: {DataTable},
  data() {
    return {
      getUserList,
      columns
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
