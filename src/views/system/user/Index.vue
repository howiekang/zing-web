<template>
  <page-header-wrapper
      :content="$t('menu.system.manger.page-header-content.desc')"
  >
    <div style="background-color: #ffffff">
      <DataTable/>
    </div>
  </page-header-wrapper>
</template>

<script>

import DataTable from "@/views/system/user/DataTable";

export default {
  name: "index",
  components: {DataTable},
  data() {
    return {}
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
