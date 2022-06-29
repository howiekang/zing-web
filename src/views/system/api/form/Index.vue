<template>
  <a-modal v-model="visible" title="Api管理" @ok="saveForm">
    <slot name="contentWrapper" />
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
      <a-form-item label="权限" >
        <a-select v-decorator="formState.permitsTypes" mode="multiple">
          <template v-for="(item,index) in apiPermitsType">
            <a-select-option :value="item">
              {{item}}
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
import {getApiPermitsType} from "@/api/system/api";
import {showMsg} from "@/utils/request";
import {createApi, updateApi} from "@/api/system/api";

export default {
  name: "ApiFormIndex",
  data(){
    return {
      visible:false,
      form:{},
      formState,
      apiPermitsType:[]
    }
  },
  created() {
    this.form = this.$form.createForm(this, {name: 'api_form'});
  },
  methods:{
    open(record) {
      this.visible = true;

      getApiPermitsType().then(res=>{
        this.apiPermitsType = res.data;
      });
      this.$nextTick(() => {
        this.form.setFieldsValue({
          apiId:record.apiId,
          name:record.name,
          apiUrl:record.apiUrl,
          permitsTypes:record.permitsTypes,
          status:record.status,
        });
      })
    },
    close() {
      this.visible = false;
    },
    saveForm(e){
      this.form.validateFields((err, values) => {
        if (!err) {
          const {apiId} = values;
          if (apiId) {
            showMsg(updateApi(values));
            return;
          }
          showMsg(createApi(values));
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
