<template>
  <div>
    <template v-for="modulePermits in modulePermitsList">
      <div class="content-body">
        <div>
        <span style="font-size: 15px">
          <a-icon type="credit-card"/>
          <span style="margin-left: 8px">
            {{ modulePermits.name }}
          </span>
        </span>
        </div>
        <div>
          <a-empty :description="false" v-if="!modulePermits.contentList || modulePermits.contentList.length === 0"/>
          <template v-for="permits in modulePermits.contentList">
            <a-checkbox
                @change="(e)=>{permitsChange(e.target.checked,permits.permitsId)}"
                :checked="indexOfPermits(permits)">
              {{ permits.funcName }}
            </a-checkbox>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {getMenuPermits} from "@/api/system/module";

export default {
  name: "RoleModulePermitsIndex",
  data() {
    return {
      modulePermitsList: [],
      bindPermitsIds: []
    }
  },
  created() {
    getMenuPermits().then(res => {
      this.modulePermitsList = res.data;
    })
  },
  methods: {
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
    indexOfPermits(permits){
      return this.bindPermitsIds.indexOf(permits.permitsId) >= 0
    },
    getBindPermitsIds(){
      return this.bindPermitsIds;
    }
  }
}
</script>

<style scoped>

</style>
