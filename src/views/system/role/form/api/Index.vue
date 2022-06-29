<template>
  <div>
    <template v-for="apiPermits in apiPermitsList">
      <div class="content-body">
        <div>
        <span style="font-size: 15px">
          <a-icon type="credit-card"/>
          <span style="margin-left: 8px">
            {{ apiPermits.name }}
          </span>
        </span>
        </div>
        <div>
          <a-empty :description="false" v-if="!apiPermits.permitsTypes || apiPermits.permitsTypes.length === 0"/>
          <template v-for="permits in apiPermits.permitsTypes">
            <a-checkbox
                @change="(e)=>{permitsChange(e.target.checked,permits.permitsId)}"
                :checked="indexOfPermits(permits)">
              {{ permits.apiPermitsType }}
            </a-checkbox>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {getApiPermits} from "@/api/system/api";

export default {
  name: "RoleApiPermitsIndex",
  data() {
    return {
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
