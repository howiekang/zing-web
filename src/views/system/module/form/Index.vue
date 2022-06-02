<template>
  <a-drawer
      :title="$t('module.create.desc')"
      :visible="visible"
      width=600
      :closable=false
      @close="close">
    <a-form
        ref="formRef"
        name="module_from"
    >
      <a-form-item>
        <a-input/>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
import {formAction} from "@/views/system/module/form/form";

export default {
  name: "ModuleFormIndex",
  data() {
    return {
      visible: false,
      formAction
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

</style>
