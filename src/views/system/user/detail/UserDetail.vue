<template>
  <a-drawer :visible="visible" @close="close" :closable=false width="700" destroyOnClose=true>
    <div style="width: 100%;background-color: #00A0E9;height: 280px">
      <div class="user-title">
        <a-avatar
            size="large"
            :src="userInfo.headImageUrl"
            :alt="userInfo.nick"
            :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle' }"/>
        {{userInfo.userName}}
      </div>
    </div>
    <a-tabs default-active-key="1" size="small" :style="{marginTop:4}">
      <a-tab-pane key="1" tab="角色">
        <div style="padding: 0 8px">
          <RoleList :user-info="userInfo"/>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>

<script>
import RoleList from "@/views/system/role/list/RoleList";

export default {
  name: "UserDetail",
  props:["userInfo"],
  components:{RoleList},
  data(){
    return{
      visible:false
    }
  },
  created() {

  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
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
