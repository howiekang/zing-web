<template>
  <a-drawer
      :visible="visible"
      width=380
      :closable=false
      @close="close">
    <template slot="title">
      <div class="title">{{ $t('module.create.desc') }}</div>
      <a-space>
        <a-button type="primary" @click="()=>{saveForm(this.form,this.$refs.funcList.getSelectDataIdList())}">
          {{ $t('save') }}
        </a-button>
        <a-button type="danger" @click="close">{{ $t('cancel') }}</a-button>
      </a-space>
    </template>
    <a-form
        :form="form"
        name="module_from"
        labelAlign="left"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
    >
      <a-form-item hidden="true">
        <a-input v-decorator="formState.id"/>
      </a-form-item>
      <a-form-item label="模块名字">
        <a-input v-decorator="formState.name"/>
      </a-form-item>
      <a-form-item label="模块路径">
        <a-input v-decorator="formState.path"/>
      </a-form-item>
      <a-form-item label="模块功能">
        <FunctionListIndex ref="funcList"/>
      </a-form-item>
      <a-form-item label="模块状态">
        <a-switch v-decorator="formState.status" checked-children="启用" un-checked-children="禁用"/>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
import {formState, saveForm} from "@/views/system/module/form/Form.js";
import FunctionListIndex from "@/views/system/function/Index";

export default {
  name: "ModuleFormIndex",
  components: {FunctionListIndex},
  data() {
    return {
      visible: false,
      form: {},
      formState: formState,
      bindFuncIds: [],
      saveForm
    }
  },
  created() {
    this.form = this.$form.createForm(this, {name: 'module_form'});
  },
  methods: {
    open(record) {
      if (record) {
        this.form.setFieldsValue(record);
      }
      this.visible = true;
    },
    close() {
      this.visible = false;
    }
  }
}
</script>

<style lang="less">
@import "./Form.less";
</style>
