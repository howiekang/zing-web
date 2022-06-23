<template>
  <a-drawer :visible="visible" @close="close" z-index=99999999 :closable=false width="700">
    <div style="width: 100%;background-color: #00A0E9;height: 280px">
      <div class="role-title">
        角色111
      </div>
    </div>
    <a-tabs default-active-key="1" size="small" :style="{marginTop:4}">
      <a-tab-pane key="1" tab="模块">
        <div style="margin: 0 8px">
          <span>模块管理</span>
          <br />
          <a-space>
            <a-checkable-tag :checked="true">添加</a-checkable-tag>
            <a-checkable-tag>添加</a-checkable-tag>
          </a-space>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="API" force-render>
        Content of Tab Pane 2
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

.role-title {
  font-size: 32px;
  color: white;
  line-height: 280px;
  text-align: center;
}

.role-desc {
  padding: 4px 0;
  background-color: #e8e8e8;
}
</style>
