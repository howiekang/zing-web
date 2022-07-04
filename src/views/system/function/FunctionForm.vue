<template>
  <a-modal
      :visible="visible"
      @ok="(e)=>{saveForm()}"
      @cancel="close"
      :closable="false">
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
      <a-form-item label="代码">
        <a-input v-decorator="formState.code"/>
      </a-form-item>
      <a-form-item label="状态">
        <a-switch v-decorator="formState.status" checked-children="启用" un-checked-children="禁用"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import {createMsg, updateMsg} from "@/utils/form";
import {createFunc} from "@/api/system/function";

const formState = {
  id: ["id", {}],
  name: [
    "name",
    {
      rules: [
        {
          required: true,
          message: '请输入功能名字'
        }, {
          max: 255,
          message: "最大长度255个字符"
        }, {
          whitespace: true
        }
      ]
    }
  ],
  code: [
    "code",
    {
      rules: [
        {
          required: true,
          message: '请输入功能代码'
        }, {
          max: 255,
          message: "最大长度255个字符"
        }, {
          whitespace: true
        }
      ]
    }
  ],
  status: [
    "status",
    {
      initialValue: true,
      valuePropName: "checked"
    }
  ],
}
export default {
  name: "FunctionForm",
  data() {
    return {
      visible: false,
      form: {},
      formState
    }
  },
  created() {
    this.form = this.$form.createForm(this, {name: 'func_form'});
  },
  methods: {
    open(record) {
      this.visible = true;

      this.$nextTick(() => {
        this.form.setFieldsValue({
          id: record.funId,
          name: record.name,
          code: record.code,
          status: record.status
        });
      })
    },
    close() {
      this.visible = false;
    },
    saveForm() {
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }

        const {id} = values;
        if (id) {
          updateMsg("功能", updateMenu(values))
          return
        }
        createMsg("功能", createFunc(values));
      });
    }
  }
}
</script>

<style scoped>

</style>
