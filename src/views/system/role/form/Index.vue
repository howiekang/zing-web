<template>
  <a-drawer
      :visible="visible"
      width=380
      :closable=false
      @close="close">
    <template slot="title">
      <div class="title">{{ $t('module.create.desc') }}</div>
      <a-space>
        <a-button type="primary" @click="()=>{saveForm(this.form)}">{{ $t('save') }}</a-button>
        <a-button type="danger" @click="close">{{ $t('cancel') }}</a-button>
      </a-space>
    </template>
    <a-form
        :form="form"
        name="role_from"
        labelAlign="left"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
    >
      <a-form-item hidden="true">
        <a-input v-decorator="formState.id"/>
      </a-form-item>
      <a-form-item label="角色名字">
        <a-input v-decorator="formState.name"/>
      </a-form-item>
      <a-form-item label="角色状态">
        <a-switch v-decorator="formState.status" checked-children="启用" un-checked-children="禁用"/>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
import {Mentions} from 'ant-design-vue';
import {formState, saveForm} from "@/views/system/role/form/Form.js";

export default {
  name: "RoleFormIndex",
  components: {Mentions},
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
    this.form = this.$form.createForm(this, {name: 'role_form'});
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
