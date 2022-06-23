<template>
  <div>
    <a-popover trigger="click" :placement="placement">
      <template slot="content">
        <div>
          <span>已绑角色 (3)</span>
          <br/>
          <a-space>
            <a-button type="link" @click="openRoleDetail">角色1</a-button>
            <a-divider type="vertical"/>
            <a-button type="link">角色2</a-button>
          </a-space>
          <a-divider />
        </div>
        <div style="margin-top: 8px">
          <span>未绑角色 (2)</span>
          <br/>
          <a-space>
            <a-button type="link">角色1</a-button>
            <a-divider type="vertical"/>
            <a-button type="link">角色2</a-button>
            <a-divider type="vertical"/>
            <a-button type="link">333333333333333</a-button>
          </a-space>
        </div>
      </template>
      <slot name="contentWrapper"></slot>
    </a-popover>

    <RoleDetailDrawer ref="roleDetailRefs"/>
  </div>
</template>

<script>
import RoleDetailDrawer from "@/views/system/role/detail/RoleDetail";

export default {
  name: "RoleListPopover ",
  props: ["placement"],
  components:{RoleDetailDrawer},
  data() {
    return {

    }
  },
  methods: {
    openRoleDetail(){
      this.$refs.roleDetailRefs.open();
    }
  }
}
</script>

<style scoped>
  .ant-divider-horizontal{
    margin: 4px 0;
  }
  .ant-btn{
    padding: 0;
    margin: 0;
  }
  .ant-divider, .ant-divider-vertical{
    margin: 0;
  }
</style>
