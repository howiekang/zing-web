<template>
  <div>
    <div>
      <span>
        已绑角色 ({{ userRoles.bindRoles.length }})
        <a-button type="link" @click="selectBindRole" v-if="userRoles.bindRoles.length > 0">解除绑定</a-button>
      </span>
      <br/>
      <div>
        <a-space v-if="isSelectBindRole">
          <a-button type="link">全选</a-button>
          <a-button type="link" @click="unBindRoleConfirm">确定</a-button>
          <a-button type="link" @click="selectBindRole">取消</a-button>
        </a-space>
        <div></div>
        <template v-for="(item, index) in userRoles.bindRoles">
          <a-checkbox v-if="isSelectBindRole" @change="(e)=>{unBindCheckbox(e,item.id)}">
            <a-button type="link" @click="openRoleDetail">
              {{ item.name }}
            </a-button>
          </a-checkbox>
          <a-button type="link" @click="openRoleDetail" v-else>{{ item.name }}</a-button>
          <a-divider type="vertical" v-if="index !== userRoles.bindRoles.length - 1 && !isSelectBindRole"/>
        </template>
      </div>
    </div>
    <div>
      <span>未绑角色 ({{ userRoles.unBindRoles.length }})
        <a-button type="link" @click="selectUnBindRole" v-action:bind>绑定</a-button>
      </span>
      <br/>
      <div>
        <a-space v-if="isSelectUnBindRole">
          <a-button type="link">全选</a-button>
          <a-button type="link" @click="bindRoleConfirm">确定</a-button>
          <a-button type="link" @click="selectUnBindRole" v-if="userRoles.unBindRoles.length > 0">取消</a-button>
        </a-space>
        <div></div>
        <template v-for="(item, index) in userRoles.unBindRoles">
          <a-checkbox v-if="isSelectUnBindRole" @change="(e)=>{bindCheckbox(e,item.id)}">
            <a-button type="link" @click="openRoleDetail">
              {{ item.name }}
            </a-button>
          </a-checkbox>
          <a-button type="link" @click="openRoleDetail" v-else>{{ item.name }}</a-button>
          <a-divider type="vertical" v-if="index !== userRoles.unBindRoles.length - 1 && !isSelectUnBindRole"/>
        </template>
      </div>
    </div>

    <RoleDetailDrawer ref="roleDetailRefs"/>
  </div>
</template>

<script>
import RoleDetailDrawer from "@/views/system/role/detail/RoleDetail";
import {bindRole, getUserBindRoles, unbindRole} from "@/api/system/user";
import {message} from "ant-design-vue";

export default {
  name: "RoleList",
  props: ["userInfo"],
  components: {RoleDetailDrawer},
  data() {
    return {
      isSelectBindRole: false,
      isSelectUnBindRole: false,
      userRoles: {
        bindRoles: [],
        unBindRoles: []
      },
      bindRoles: [],
      unBindRoles: []
    }
  },
  created() {
    this.getUserRoles();
  },
  methods: {
    getUserRoles(){
      this.bindRoles = [];
      this.unBindRoles = [];
      if (this.userInfo) {
        const {userId} = this.userInfo;
        getUserBindRoles(userId).then(res => {
          this.userRoles = res.data;
        })
      }
    },
    openRoleDetail() {
      this.$refs.roleDetailRefs.open();
    },
    selectBindRole() {
      if (this.isSelectBindRole) {
        this.isSelectBindRole = false;
        this.unBindRoles = [];
        return;
      }
      let bindRoles = this.userRoles.bindRoles;
      if (bindRoles && bindRoles.length <= 0) {
        message.info("还没有绑定角色");
        return
      }

      this.isSelectBindRole = true;
    },
    selectUnBindRole() {
      if (this.isSelectUnBindRole) {
        this.isSelectUnBindRole = false;
        this.bindRoles = [];
        return;
      }
      let unBindRoles = this.userRoles.unBindRoles;
      if (unBindRoles && unBindRoles.length <= 0) {
        message.info("绑定了全部的角色");
        return
      }

      this.isSelectUnBindRole = true;
    },
    unBindCheckbox(e,roleId) {
      const {checked} = e.target;
      if (checked) {
        this.unBindRoles.push(roleId);
        return
      }

      this.unBindRoles.forEach((item, index, arr)=>{
        if (item === roleId){
          arr.splice(index, 1);
        }
      })
    },
    bindCheckbox(e,roleId) {
      const {checked} = e.target;
      if (checked) {
        this.bindRoles.push(roleId);
        return
      }

      this.bindRoles.forEach((item, index, arr)=>{
        if (item === roleId){
          arr.splice(index, 1);
        }
      })
    },
    bindRoleConfirm(){
      if (this.bindRoles.length === 0){
        message.warning("没有选择角色");
        return
      }
      bindRole(this.userInfo.userId,this.bindRoles).then(res=>{
        this.bindResultProcess(res);
      });
    },
    unBindRoleConfirm(){
      if (this.unBindRoles.length === 0){
        message.warning("没有选择角色");
        return
      }
      unbindRole(this.userInfo.userId,this.unBindRoles).then(res=>{
        this.bindResultProcess(res);
      });
    },
    bindResultProcess(res){
      if (res.data){
        this.getUserRoles();
        return
      }
      message.error("绑定失败");
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
