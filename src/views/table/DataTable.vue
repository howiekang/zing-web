<template>
  <a-table
      ref="table"
      size="default"
      :columns="columns"
      :dataSource="result.records"
      :loading="loading"
      :pagination="{
        current: pageParam.current,
        total:pageParam.total,
        pageSize: pageParam.pageSize,
        onChange:(page, pageSize)=>{
          this.pageParam.current = page;
          this.pageParam.pageSize = pageSize;
          this.loadData(this.pageParam);
        },
        onShowSizeChange: (pageSize)=>{
          this.pageParam.pageSize = pageSize;
          this.loadData(this.pageParam);
        }
      }"
      :customRow="customRow"
      :customCell="customCell"
  >
    <template
        v-for="column in columns"
        :slot="column.scopedSlots?column.scopedSlots.customRender:''"
        slot-scope="text,record">
      <slot :name="column.scopedSlots?column.scopedSlots.customRender:''" :text="text" :record="record"></slot>
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
        pageSize: 10,
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
        const {current, total, size, records} = res.data;
        this.pageParam.current = current;
        this.pageParam.total = total;
        this.pageParam.pageSize = size;
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
