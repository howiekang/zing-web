<template>
  <a-popover trigger="click">
    <a-tag color="green">
      <a-space>
        <a-icon type="plus"/>
        <span>绑定</span>
      </a-space>
    </a-tag>

    <template slot="content">
      <a-select
          show-search
          mode="multiple"
          @search="handlerSearch"
          :value="selectRoleIds"
          @select="select"
          @deselect="deSelect"
      >
        <a-select-option
            v-for="(roleInfo,index) in roleInfoList"
            :key="roleInfo.id"
            :value="roleInfo.id">
          {{ roleInfo.name }}
        </a-select-option>
      </a-select>
      <a-button @click="confirmBind">确定</a-button>
    </template>
  </a-popover>
</template>

<script>
import {rolePage} from "@/api/system/role";
import {bindRole} from "@/api/system/user";
import {message} from "ant-design-vue";

export default {
  name: "BindRole",
  props: ["userInfo", "dropdownNumber", "bindRoleIds"],
  data() {
    return {
      index: 1,
      roleInfoList: [],
      selectRoleIds: []
    }
  },
  created() {
    this.refreshRoleList(null)
  },
  methods: {
    refreshRoleList(name) {
      rolePage(this.getPageParam(this.index, name)).then(res => {
        const {data: {records}} = res
        for (const record of records) {
          if (this.bindRoleIds.indexOf(record.id) < 0) {
            this.roleInfoList.push(record)
          }
        }
      })
    },
    getPageParam(index, name) {
      return {
        current: index,
        size: this.getDropdownNumber(),
        name: name
      }
    },
    getDropdownNumber() {
      return this.dropdownNumber ? this.dropdownNumber : 5
    },
    handlerSearch(value) {
      this.roleInfoList = []
      this.selectRoleIds = []
      this.refreshRoleList(value)
    },
    select(value, option) {
      this.selectRoleIds.push(value)
    },
    deSelect(value, option) {
      this.selectRoleIds.forEach((item, index, arr) => {
        if (item === value) {
          arr.splice(index, 1);
        }
      })
    },
    confirmBind() {
      if (this.selectRoleIds.length === 0) {
        message.warning("没有选择角色")
        return
      }

      bindRole(this.userInfo.userId, this.selectRoleIds).then(res => {
        if (res.data) {
          message.success("绑定成功")
          return
        }
        message.error("绑定失败")
      })
    }
  }
}
</script>

<style lang="less">
.ant-select {
  width: 100%;
}

.ant-popover-inner-content {
  width: 200px;
}
</style>
