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
      :customCell="customCell"
  >
    <template
        v-for="column in columns"
        :slot="column.scopedSlots?column.scopedSlots.customRender:''"
        slot-scope="text,record">
      <slot :name="column.scopedSlots?column.scopedSlots.customRender:''" v-bind:scope="record"></slot>
    </template>
  </a-table>
</template>

<script>
import {getPageParam} from "@/utils/util";

export default {
  name: "DataTable",
  props: [
    "columns",
    "dataAction",
    "customRow",
    "customCell"
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
