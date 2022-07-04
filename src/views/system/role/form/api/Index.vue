<template>
  <a-row>
    <a-col span="24">
      <a-table
          :bordered="true"
          size="small"
          :columns="columns"
          :data-source="apiPermitsList"
          :pagination="false"
          :showHeader="false">
        <template slot="permits" slot-scope="text,record">
          <span v-if="!record.contentList">暂无权限</span>
          <a-checkable-tag
              v-else
              v-for="item in record.contentList"
              @change="(checked)=>{permitsChange(checked,item.permitsId)}"
              :checked="indexOfPermits(item)">
            {{ item.name }}
          </a-checkable-tag>
        </template>
      </a-table>
    </a-col>
  </a-row>
<!--  <div>-->
<!--    <template v-for="apiPermits in apiPermitsList">-->
<!--      <div class="content-body">-->
<!--        <div>-->
<!--        <span style="font-size: 15px">-->
<!--          <a-icon type="credit-card"/>-->
<!--          <span style="margin-left: 8px">-->
<!--            {{ apiPermits.name }}-->
<!--          </span>-->
<!--        </span>-->
<!--        </div>-->
<!--        <div>-->
<!--          <a-empty :description="false" v-if="!apiPermits.contentList"/>-->
<!--          <template v-for="content in apiPermits.contentList">-->
<!--            <a-checkbox-->
<!--                @change="(e)=>{permitsChange(e.target.checked,content.permitsId)}"-->
<!--                :checked="indexOfPermits(content)">-->
<!--              {{ content.name }}-->
<!--            </a-checkbox>-->
<!--          </template>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--  </div>-->
</template>

<script>
import {getApiPermits} from "@/api/system/api";

const columns = [
  {
    title: "名字",
    dataIndex: 'name'
  },
  {
    title: "路径",
    dataIndex: 'apiUrl'
  },
  {
    title: "权限",
    scopedSlots: {customRender: 'permits'}
  }
]

export default {
  name: "RoleApiPermitsIndex",
  data() {
    return {
      columns,
      apiPermitsList: [],
      bindPermitsIds: []
    }
  },
  created() {
    getApiPermits().then(res => {
      this.apiPermitsList = res.data;
    });
  },
  methods:{
    refreshPermits(bindPermitsIds){
      this.bindPermitsIds = bindPermitsIds;
    },
    permitsChange(checked, permitsId) {
      if (checked) {
        this.bindPermitsIds.push(permitsId)
        return
      }

      this.bindPermitsIds.forEach((item, index, arr) => {
        if (item === permitsId) {
          arr.splice(index, 1);
        }
      })
    },
    indexOfPermits(content){
      return this.bindPermitsIds.indexOf(content.permitsId) >= 0
    },
    getBindPermitsIds(){
      return this.bindPermitsIds;
    }
  }
}
</script>

<style scoped>

</style>
