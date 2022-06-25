<template>
  <a-drawer :visible="visible" @close="close" z-index=99999999 :closable=false width="700">
    <div style="width: 100%;background-color: #00A0E9;height: 280px">
      <div class="role-title">
        角色111
      </div>
    </div>
    <a-tabs default-active-key="1" size="small" :style="{marginTop:4}">
      <a-tab-pane key="1" tab="模块">
        <template v-for="i in 20">
          <div class="content-body">
            <div style="margin-top: 8px">
              <a-divider type="vertical"/><span style="font-size: 16px;">模块管理</span>
            </div>
            <div>
              <template v-for="i in 20">
                <a-tag closable>添加{{ i }}</a-tag>
              </template>
            </div>
          </div>
        </template>
      </a-tab-pane>
      <a-tab-pane key="2" tab="API" force-render>
        <div class="content-body">
          <div>
            <a-divider type="vertical"/><span style="font-size: 16px;">获取用户</span>
          </div>
          <div style="margin-top: 8px">
            <span>路径: https://localhost:33/api/list</span>
          </div>
          <div>
            权限:
            <template v-for="i in 5">
              <a-tag closable>读写{{ i }}</a-tag>
            </template>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>

<script>
export default {
  name: "RoleDetailDrawer",
  data() {
    return {
      visible: false
    }
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

/deep/ .ant-space-align-center {
  margin-top: 8px;
}

/deep/ .ant-tag {
  margin-top: 8px;
}

/deep/ .ant-divider, .ant-divider-vertical{
  width: 4px;
  background-color: #00A0E9;
  margin: 0 8px 0 0;
}

.role-title {
  font-size: 32px;
  color: white;
  line-height: 280px;
  text-align: center;
}

.content-body{
  margin: 0 8px 8px;
}
</style>
