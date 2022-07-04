<template>
  <div>
    <a-button type="link" style="padding: 0" @click="()=>{this.showSearch = !this.showSearch}">高级搜索</a-button>
    <a-button type="link">下一页</a-button>
    <a-row>
      <a-col :span="24">
        <a-input/>
      </a-col>
      <a-col v-if="showSearch" :span="24" style="margin-top: 8px">
        <a-space>
          <a-checkbox>无权菜单</a-checkbox>
          <a-checkbox>未绑菜单</a-checkbox>
        </a-space>
      </a-col>
    </a-row>
    <a-row style="margin-top: 8px">
      <a-col span="24">
        <a-table
            :bordered="true"
            size="small"
            :columns="columns"
            :data-source="menuPermitsList"
            :pagination="false"
            :showHeader="false">
          <template slot="permits" slot-scope="text,record">
            <span v-if="!record.contentList">暂无权限</span>
            <a-checkable-tag
                v-else
                v-for="item in record.contentList"
                @change="(checked)=>{permitsChange(checked,item.permitsId)}"
                :checked="indexOfPermits(item)">
              {{ item.name }}
            </a-checkable-tag>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {getMenuPermits} from "@/api/system/module";

const columns = [
  {
    title: "菜单",
    dataIndex: 'name'
  },
  {
    title: "权限",
    scopedSlots: {customRender: 'permits'}
  }
]

export default {
  name: "RoleMenuPermitsIndex",
  data() {
    return {
      columns,
      menuPermitsList: [],
      bindPermitsIds: [],
      showSearch: false
    }
  },
  created() {
    getMenuPermits().then(res => {
      this.menuPermitsList = res.data;
    })
  },
  methods: {
    refreshPermits(bindPermitsIds) {
      this.bindPermitsIds = bindPermitsIds;
    },
    permitsChange(checked, permitsId) {
      if (checked) {
        this.bindPermitsIds.push(permitsId)
        return
      }

      this.bindPermitsIds.forEach((item, index, arr) => {
        if (item === permitsId) {
          arr.splice(index, 1);
        }
      })
    },
    indexOfPermits(content) {
      return this.bindPermitsIds.indexOf(content.permitsId) >= 0
    },
    getBindPermitsIds() {
      return this.bindPermitsIds;
    }
  }
}
</script>

<style scoped>

</style>
