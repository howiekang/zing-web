<template>
  <a-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :dataSource="result.records"
      :loading="loading"
      :pagination="pageParam"
      :customRow="customRow"
  />
</template>

<script>
import {getPageParam} from "@/utils/util";

export default {
  name: "DataTable",
  props: [
    "columns",
    "dataAction",
    "customRow"
  ],
  data() {
    return {
      result: {
        records: []
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
        const {current, total, records} = res.data;
        this.pageParam.current = current;
        this.pageParam.total = total;
        this.result.records = records;
        this.loading = false;
      }).catch(reason => {
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>
