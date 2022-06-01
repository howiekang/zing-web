<template>
  <a-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :dataSource="result.data"
      :loading="loading"
      :pagination="pageParam"
  >

  </a-table>
</template>

<script>
import {getPageParam} from "@/utils/util";

export default {
  name: "DataTable",
  props: [
    "columns",
    "dataAction"
  ],
  data() {
    return {
      result: {
        data: []
      },
      loading: false,
      pageParam: {
        current: 1,
        defaultCurrent: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.loadData(this.pageParam)
  },
  methods: {
    loadData(param) {
      this.loading = true;
      this.dataAction(getPageParam(param)).then(res => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
