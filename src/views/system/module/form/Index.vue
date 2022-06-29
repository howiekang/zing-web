<template>
  <a-drawer
      :visible="visible"
      width=380
      :closable=false
      @close="close">
    <template slot="title">
      <div class="title">{{ $t('module.create.desc') }}</div>
      <a-space>
        <a-button type="primary" @click="()=>{saveForm(this.form,bindFuncIds)}">
          {{ $t('save') }}
        </a-button>
        <a-button type="danger" @click="close">{{ $t('cancel') }}</a-button>
      </a-space>
    </template>
    <div>
      <div style="margin-top: 8px">
        <a-divider type="vertical"/>
        基础
      </div>
      <div style="padding: 0 8px;width: 380px;">
        <a-form
            :form="form"
            name="module_from"
            labelAlign="right"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 19 }"
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
                :tree-data="moduleTreeData"
                placeholder="选择父级模块"
                :load-data="loadModule"
                :treeIcon=true
            />
          </a-form-item>
          <a-form-item label="路径">
            <a-input v-decorator="formState.path"/>
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
          <a-checkbox :checked="bindFuncIds.indexOf(func.funId) >= 0" @change="(e)=>{funcChange(e,func.funId)}">
            {{ func.funcName }}
          </a-checkbox>
        </template>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import {formState, saveForm} from "@/views/system/module/form/Form.js";
import FunctionListIndex from "@/views/system/function/Index";
import {getFunctionList} from "@/api/system/function";
import {getBindPermitsIds, getChildrenList, getTopLevelMenuList} from "@/api/system/module";

export default {
  name: "ModuleFormIndex",
  components: {FunctionListIndex},
  data() {
    return {
      visible: false,
      form: {},
      formState: formState,
      funcList: [],
      bindFuncIds: [],
      saveForm,
      moduleTreeData: [],
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
      this.bindFuncIds = [];
      this.moduleTreeData = [];
    },
    open(record) {
      this.initValues();
      this.visible = true;

      getTopLevelMenuList().then(res => {
        this.refreshModuleTree(res.data)
      });

      if (record) {
        getBindPermitsIds(record.id).then(res => {
          if (res.data) {
            this.bindFuncIds = res.data;
          }
        });

        this.$nextTick(() => {
          this.form.setFieldsValue({
            id: record.id,
            name: record.name,
            path: record.path,
            status: record.status,
            icon: record.icon,
            extendData: record.extendData,
          });
        })
      }
    },
    refreshModuleTree(moduleData) {
      if (moduleData) {
        for (let item of moduleData) {
          this.moduleTreeData.push({
            id: item.id,
            pId: item.parentId,
            value: item.id,
            title: item.name
          });
        }
      }
    },
    loadModule(treeModule) {
      return new Promise(resolve => {
        const {id} = treeModule.dataRef;
        getChildrenList(id).then(res => {
          this.refreshModuleTree(res.data)
          resolve();
        })
      });
    },
    close() {
      this.visible = false;
    },
    funcChange(e, funcId) {
      const {checked} = e.target;
      if (checked) {
        this.bindFuncIds.push(funcId);
        return
      }

      this.bindFuncIds.forEach((item, index, arr) => {
        if (item === funcId) {
          arr.splice(index, 1);
        }
      })
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
