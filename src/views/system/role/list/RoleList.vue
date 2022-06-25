<template>
  <div>
    <div>
      <span>已绑角色 (3) <a-button type="link" @click="selectBindRole">解除绑定</a-button></span>
      <br/>
      <div>
        <a-space v-if="isSelectBindRole">
          <a-button type="link" >全选</a-button>
          <a-button type="link" @click="selectBindRole">取消</a-button>
        </a-space>
        <div></div>
        <template v-for="(item, index) in userRoles.bindRoles">
          <a-checkbox v-if="isSelectBindRole">
            <a-button type="link" @click="openRoleDetail">
              {{ item.name }}
            </a-button>
          </a-checkbox>
          <a-button type="link" @click="openRoleDetail" v-else>{{ item.name }}</a-button>
          <a-divider type="vertical" v-if="index != userRoles.bindRoles.length - 1 && !isSelectBindRole"/>
        </template>
      </div>
    </div>
    <div>
      <span>未绑角色 (2) <a-button type="link" @click="selectUnBindRole">绑定</a-button></span>
      <br/>
      <div>
        <a-space v-if="isSelectUnBindRole">
          <a-button type="link" >全选</a-button>
          <a-button type="link" @click="selectUnBindRole">取消</a-button>
        </a-space>
        <div></div>
        <template v-for="(item, index) in userRoles.unBindRoles">
          <a-checkbox v-if="isSelectUnBindRole">
            <a-button type="link" @click="openRoleDetail">
              {{ item.name }}
            </a-button>
          </a-checkbox>
          <a-button type="link" @click="openRoleDetail" v-else>{{ item.name }}</a-button>
          <a-divider type="vertical" v-if="index != userRoles.unBindRoles.length - 1 && !isSelectUnBindRole"/>
        </template>
      </div>
    </div>

    <RoleDetailDrawer ref="roleDetailRefs"/>
  </div>
</template>

<script>
import RoleDetailDrawer from "@/views/system/role/detail/RoleDetail";

export default {
  name: "RoleList",
  components: {RoleDetailDrawer},
  data() {
    return {
      isSelectBindRole: false,
      isSelectUnBindRole: false,
      userRoles: {
        bindRoles: [
          {name: "角色1"},
          {name: "角色2"}
        ],
        unBindRoles: [
          {name: "角色1"},
          {name: "角色2"}
        ]
      }
    }
  },
  methods: {
    openRoleDetail() {
      this.$refs.roleDetailRefs.open();
    },
    selectBindRole(){
      if (this.isSelectBindRole){
        this.isSelectBindRole = false;
        return;
      }
      let bindRoles = this.userRoles.bindRoles;
      if (bindRoles && bindRoles.length <= 0){
        message.info("还没有绑定角色");
        return
      }

      this.isSelectBindRole = true;
    },
    selectUnBindRole(){
      if (this.isSelectUnBindRole){
        this.isSelectUnBindRole = false;
        return;
      }
      let unBindRoles = this.userRoles.unBindRoles;
      if (unBindRoles && unBindRoles.length <= 0){
        message.info("绑定了全部的角色");
        return
      }

      this.isSelectUnBindRole = true;
    }
  }
}
</script>

<style scoped>
.ant-divider-horizontal {
  margin: 4px 0;
}

.ant-btn {
  padding: 0;
  margin: 0;
}

.ant-divider, .ant-divider-vertical {
  margin: 0 4px;
}
</style>
