<template>
  <a-drawer :visible="visible" @close="close" :closable=false width="700" :destroyOnClose=true>
    <div style="width: 100%;background-color: #00A0E9;height: 280px">
      <div class="user-title">
        <a-avatar
            size="large"
            :src="userInfo.headImageUrl"
            :alt="userInfo.nick"
            :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle' }"/>
        {{ userInfo.userName }}
      </div>
    </div>
    <a-tabs default-active-key="1" size="small" :style="{marginTop:4}">
      <a-tab-pane key="1" tab="角色">
        <div style="padding: 0 8px">
          <BindRole :user-info="userInfo" :bind-role-ids="bindRoleIds"/>
          <template v-for="(item,index) in bindRoles">
            <a-tag
                :closable="true"
                color="blue"
                @close="()=>{unBindRole(userInfo.userId,item.id)}">
              {{ item.name }}
            </a-tag>
          </template>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>

<script>

import {getBindRoles, unbindRole} from "@/api/system/user";
import BindRole from "@/views/system/user/detail/BindRole";

export default {
  name: "UserDetail",
  components: {BindRole},
  props: ["userInfo"],
  data() {
    return {
      visible: false,
      bindRoles: [],
      bindRoleIds:[]
    }
  },
  methods: {
    open() {
      this.visible = true;

      getBindRoles(this.userInfo.userId).then(res => {
        this.bindRoles = res.data

        for (const bindRole of this.bindRoles) {
          this.bindRoleIds.push(bindRole.id)
        }
      })
    },
    close() {
      this.visible = false;
    },
    unBindRole(userId, roleId) {
      unbindRole(userId,[roleId])
    }
  }
}
</script>

<style scoped>
/deep/ .ant-drawer-body {
  padding: 0;
}

/deep/ .ant-tabs-ink-bar {
  height: 3px;
}

/deep/ .ant-tag {
  margin-top: 8px;
}

.user-title {
  font-size: 32px;
  color: white;
  line-height: 280px;
  text-align: center;
}
</style>
