<template>
  <a-mentions
      @select="select"
      @change="change"
      :autoFocus=true
      placeholder="可以使用 @ 或者 # 号选择功能"
      :prefix="['@', '#']">
    <template v-for="data in dataList">
      <a-mentions-option :value="data.funcName">
        <span style="padding-right: 8px">{{ data.funcName }}</span>
        <a-icon type="thunderbolt" v-if="!data.status" :style="{ color: 'orange' }"/>
      </a-mentions-option>
    </template>
  </a-mentions>
</template>

<script>
import {getFunctionList} from "@/api/system/function";

export default {
  name: "FunctionListIndex",
  data() {
    return {
      dataList: [],
      selectData: "",
      selectDataList: []
    }
  },
  created() {
    getFunctionList().then(res => {
      this.dataList = res.data;
    });
  },
  methods: {
    select(option) {
      let val = null;
      this.dataList.forEach(function (item, index, arr) {
        if (item.funcName === option.value) {
          val = item;
        }
      });

      this.selectDataList.push(val)
      this.dataList.forEach(function (item, index, arr) {
        if (item.funcName == option.value) {
          arr.splice(index, 1);
        }
      });
    },
    change(option) {
      let that = this;
      this.selectDataList.forEach(function (item, index, arr) {
        if (item.funcName.indexOf(option)) {
          that.dataList.push(item);
          arr.splice(index, 1);
        }
      });
    },
    getSelectDataIdList() {
      let ids = [];
      this.selectDataList.forEach((item, index, arr) => {
        ids.push(item.funId);
      });
      return ids;
    }
  }
}
</script>

<style scoped>

</style>
