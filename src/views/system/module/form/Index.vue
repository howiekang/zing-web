<template>
  <a-modal
      :visible="visible"
      @ok="(e)=>{saveForm(this.form,this.bindPermitsIds)}"
      @cancel="close"
      :closable="false">
    <div>
      <div style="margin-top: 8px">
        <a-divider type="vertical"/>
        基础
      </div>
      <div>
        <a-form
            :form="form"
            name="module_from"
            labelAlign="right"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
        >
          <a-form-item hidden="true">
            <a-input v-decorator="formState.id"/>
          </a-form-item>
          <a-form-item label="名字">
            <a-input v-decorator="formState.name"/>
          </a-form-item>
          <a-form-item label="父级">
            <a-tree-select
                v-decorator="formState.parentId"
                tree-data-simple-mode
                :tree-data="menuTreeData"
                placeholder="选择父级模块"
                :load-data="loadMenuTree"
                :showSearch=true
                @search="menuTreeSearch"
            />
          </a-form-item>
          <a-form-item label="路径">
            <a-input v-decorator="formState.path"/>
          </a-form-item>
          <a-form-item label="代码" v-if="!isUpdate">
            <a-input v-decorator="formState.code"/>
          </a-form-item>
          <a-form-item label="状态">
            <a-switch v-decorator="formState.status" checked-children="启用" un-checked-children="禁用"/>
          </a-form-item>
          <a-form-item label="扩展数据">
            <a-textarea v-decorator="formState.extendData"/>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div>
      <div style="margin-top: 8px">
        <a-divider type="vertical"/>
        权限
      </div>
      <div style="margin: 8px 0;padding: 0 8px;">
        <a-empty :description="false" v-if="funcList.length === 0"/>
        <template v-for="func in funcList">
          <a-checkbox :checked="bindPermitsIds.indexOf(func.funId) >= 0" @change="(e)=>{permitsChange(e,func.funId)}">
            {{ func.name }}
          </a-checkbox>
        </template>
      </div>
    </div>
  </a-modal>
</template>

<script>
import {formState, saveForm} from "@/views/system/module/form/Form.js";
import {getFunctionList} from "@/api/system/function";
import {getBindPermitsIds, getSubList, getTopLevelMenuList} from "@/api/system/module";

const TOP_MENU = {
  id: "0",
  pId: -1,
  value: "0",
  title: "根菜单"
}

export default {
  name: "MenuFormIndex",
  data() {
    return {
      visible: false,
      form: {},
      formState: formState,
      funcList: [],
      bindPermitsIds: [],
      saveForm,
      menuTreeData: [TOP_MENU],
      isUpdate: false,
      menuTreeState: {
        menuId: 0,
        searchDesc: ''
      }
    }
  },
  created() {
    this.form = this.$form.createForm(this, {name: 'module_form'});
    getFunctionList().then(res => {
      this.funcList = res.data;
    });
  },
  methods: {
    initValues() {
      this.bindPermitsIds = []
      this.menuTreeData = [TOP_MENU]
      this.isUpdate = false
    },
    open(record) {
      this.initValues();
      this.visible = true;

      getTopLevelMenuList().then(res => {
        this.refreshMenuTree(res.data)
      });

      if (record) {
        this.isUpdate = true;
        getBindPermitsIds(record.id).then(res => {
          if (res.data) {
            this.bindPermitsIds = res.data;
          }
        });

        this.$nextTick(() => {
          this.form.setFieldsValue({
            id: record.id,
            name: record.name,
            parentId: record.parentId,
            path: record.path,
            code: record.code,
            status: record.status,
            icon: record.icon,
            extendData: record.extendData,
          });
        })
      }
    },
    refreshMenuTree(menuData) {
      if (!menuData) {
        return
      }

      for (const menu of menuData) {
        this.menuTreeData.push({
          id: menu.id,
          pId: menu.parentId,
          value: menu.id,
          title: menu.name
        });
      }
    },
    loadMenuTree(treeMenu) {
      return new Promise(resolve => {
        const {id} = treeMenu.dataRef;
        if (id === TOP_MENU.id) {
          resolve()
          return
        }

        this.menuTreeState.menuId = id
        this.refreshSubMenuList(resolve)
      });
    },
    refreshSubMenuList(callback) {
      getSubList(this.menuTreeState).then(res => {
        this.refreshMenuTree(res.data)
        callback && callback()
      })
    },
    close() {
      this.visible = false;
    },
    permitsChange(e, funcId) {
      const {checked} = e.target;
      if (checked) {
        this.bindPermitsIds.push(funcId);
        return
      }

      this.bindPermitsIds.forEach((item, index, arr) => {
        if (item === funcId) {
          arr.splice(index, 1);
        }
      })
    },
    menuTreeSearch(value) {
      this.menuTreeState.menuId = null
      this.menuTreeState.searchDesc = value
      this.menuTreeData = []
      this.refreshSubMenuList()
    }
  }
}
</script>

<style lang="less">
.ant-divider, .ant-divider-vertical {
  width: 4px;
  background-color: #00A0E9;
  margin: 0 8px 0 0;
}

.ant-tabs-ink-bar {
  height: 3px;
}

.ant-drawer-body {
  padding: 0;
}

.ant-drawer-header {
  display: flex;
  justify-content: space-between;
  align-content: center;

  .ant-drawer-title {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;

    .title {
      margin: 0;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
    }
  }
}

.ant-form-item {
  margin-bottom: 0;
}

.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0;
}

.content-body {
  margin: 0 8px 8px;
}
</style>
