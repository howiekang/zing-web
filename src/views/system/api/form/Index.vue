<template>
  <a-modal v-model="visible" title="Api管理" @ok="saveForm">
    <slot name="contentWrapper"/>
    <a-form
        :form="form"
        labelAlign="right"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
    >
      <a-form-item hidden="true">
        <a-input v-decorator="formState.apiId"/>
      </a-form-item>
      <a-form-item label="名字">
        <a-input v-decorator="formState.name"/>
      </a-form-item>
      <a-form-item label="权限">
        <a-select v-decorator="formState.permitsIds" mode="multiple">
          <template v-for="(item,index) in functionList">
            <a-select-option :value="item.funId">
              {{ item.name }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item label="路径">
        <a-input v-decorator="formState.apiUrl"/>
      </a-form-item>
      <a-form-item label="状态">
        <a-switch v-decorator="formState.status" checked-children="启用" un-checked-children="禁用"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {formState} from "@/views/system/api/form/form";
import {createApi, updateApi} from "@/api/system/api";
import {getFunctionList} from "@/api/system/function";
import {updateMsg} from "@/utils/form";

export default {
  name: "ApiFormIndex",
  data() {
    return {
      visible: false,
      form: {},
      formState,
      functionList: []
    }
  },
  created() {
    this.form = this.$form.createForm(this, {name: 'api_form'});
    getFunctionList().then(res => {
      this.functionList = res.data;
    });
  },
  methods: {
    open(record) {
      this.visible = true;

      const {contentList} = record
      const permitsIds = []
      if (contentList) {
        for (const content of contentList) {
          permitsIds.push(content.funId)
        }
      }

      this.$nextTick(() => {
        this.form.setFieldsValue({
          apiId: record.apiId,
          name: record.name,
          apiUrl: record.apiUrl,
          permitsIds: permitsIds,
          status: record.status,
        });
      })
    },
    close() {
      this.visible = false;
    },
    saveForm(e) {
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }

        const {apiId} = values;
        if (apiId) {
          updateMsg("Api", updateApi(values),()=>{this.close()});
          return;
        }
        createApi("Api", createApi(values),()=>{this.close()});
      });
    }
  }
}
</script>

<style scoped>

</style>
