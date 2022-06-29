<template>
  <a-drawer
      :visible="visible"
      width=480
      :closable=false
      :destroyOnClose=true
      @close="close">
    <template slot="title">
      <div class="title">{{ $t('module.create.desc') }}</div>
      <a-space>
        <a-button type="primary" @click="saveForm">{{ $t('save') }}</a-button>
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
            labelAlign="right"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
        >
          <a-form-item hidden="true">
            <a-input v-decorator="formState.id"/>
          </a-form-item>
          <a-form-item label="名称">
            <a-input v-decorator="formState.name"/>
          </a-form-item>
          <a-form-item label="状态">
            <a-switch
                v-decorator="formState.status"
                checked-children="启用"
                un-checked-children="禁用"
            />
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div>
      <div style="margin-top: 8px">
        <a-divider type="vertical"/>
        权限
      </div>
      <div>
        <a-tabs default-active-key="1" size="small" @change="tableChange">
          <a-tab-pane key="1" tab="模块">
            <RoleModulePermitsIndex ref="modulePermits"/>
          </a-tab-pane>
          <a-tab-pane key="2" tab="API">
            <RoleApiPermitsIndex ref="apiPermits"/>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import {Mentions} from 'ant-design-vue';
import {formState} from "@/views/system/role/form/Form.js";
import {createRole, getRolePermits, updateRole} from "@/api/system/role";
import {showMsg} from "@/utils/request";
import RoleModulePermitsIndex from "@/views/system/role/form/module/Index";
import RoleApiPermitsIndex from "@/views/system/role/form/api/Index";

export default {
  name: "RoleFormIndex",
  components: {RoleApiPermitsIndex, RoleModulePermitsIndex, Mentions},
  data() {
    return {
      visible: false,
      form: {},
      roleInfo:{},
      formState: formState,
      rolePermitIds:{
        modulePermitsIds:[],
        apiPermitsIds:[]
      }
    }
  },
  created() {
    this.form = this.$form.createForm(this, {name: 'role_form'});
  },
  methods: {
    open(record) {
      this.visible = true;
      this.roleInfo = record;
      if (record) {
        this.$nextTick(() => {
          this.form.setFieldsValue({
            id:record.id,
            name:record.name,
            status:record.status,
          });

          this.refreshPermits();
        });
      }
    },
    close() {
      this.visible = false;
    },
    refreshPermits(){
      if (!this.roleInfo){
        return
      }
      getRolePermits(this.roleInfo.id).then(res=>{
        const{apiPermitsIds,modulePermitsIds} = res.data;
        this.$refs.modulePermits.refreshPermits(modulePermitsIds);
        if (this.$refs.apiPermits){
          this.$refs.apiPermits.refreshPermits(apiPermitsIds);
        }
      })
    },
    tableChange(){
      this.refreshPermits()
    },
    saveForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const {id} = values;
          let permitsBodies = [];
          permitsBodies.push(
              ...this.bindPermitsProcess(this.$refs.modulePermits.getBindPermitsIds(),"Module")
          );
          permitsBodies.push(
              ...this.bindPermitsProcess(this.$refs.apiPermits.getBindPermitsIds(),"Api")
          );
          values.permitsBodies = permitsBodies;
          if (id) {
            updateRole(values);
            return;
          }
          showMsg(createRole(values))
        }
      });
    },
    bindPermitsProcess(permitsIds,permitsType){
      if (!permitsIds){
        return []
      }
      let permitsArray = [];
      for (const index in permitsIds) {
        permitsArray.push({
          permitsId:permitsIds[index],
          permitsType
        })
      }
      return permitsArray;
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
