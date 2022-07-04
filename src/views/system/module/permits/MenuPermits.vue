<template>
  <a-modal :visible="visible" @cancel="close" :closable="false">
    <a-row>
      <a-col span="12" style="border-right: 1px solid #e8e8e8">
        <a-tree
            checkable
            :load-data="loadTreeData"
            :tree-data="treeDatas"
            @check="(val,info)=>{treeDataCheck(val,info,this.treeDatas,true)}"
        />
      </a-col>
      <a-col span="12" style="border-left: 1px solid #e8e8e8">
        <a-row v-for="(menu,index) in menuList" style="margin-top: 8px;padding-left: 8px">
          <a-col>
            <span>{{ menu.title }}</span>
          </a-col>
          <a-col>
            <a-space>
              <a-checkbox
                  :checked="indexOfPermits(menu,permit)"
                  @change="(e)=>{permitsChange(e,menu,permit.funId)}"
                  v-for="permit in permits">
                {{ permit.name }}
              </a-checkbox>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import {getFunctionList} from "@/api/system/function";
import {getMenuPermits, getSubList, getTopLevelMenuList} from "@/api/system/module";

export default {
  name: "MenuPermits",
  data() {
    return {
      visible: false,
      menuList: [],
      permits: [],
      bindPermits: [],
      treeDatas: []
    }
  },
  created() {
    getMenuPermits().then(res => {
      if (res.data) {
        for (const data of res.data) {
          const {id, contentList} = data
          let permitsIds = []
          if (contentList) {
            for (const content of contentList) {
              permitsIds.push(content.funId)
            }
          }
          this.bindPermits.push({
            id: id,
            permitsIds
          })
        }
      }
    })
  },
  methods: {
    open() {
      this.menuList = []
      getFunctionList().then(res => {
        this.permits = res.data
      })
      getTopLevelMenuList().then(res => {
        for (const menu of res.data) {
          this.treeDatas.push({
            id: menu.id,
            parentId: 0,
            key: menu.id,
            title: menu.name
          });
        }
      })
      this.visible = true
    },
    close() {
      this.visible = false
    },
    loadTreeData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }

        const {id} = treeNode.dataRef;
        getSubList({
          menuId: id,
          searchDesc: ''
        }).then(res => {
          resolve()
          this.refreshTreeMenu(treeNode.dataRef, id, res.data)
        })
      });
    },
    treeDataCheck(checkedKeys, info) {
      this.menuList = []

      for (const checkedKey of checkedKeys) {
        const data = this.treeKeyCheck(checkedKey, this.treeDatas)
        if (data) {
          this.menuList.push(data)
        }
      }
    },
    treeKeyCheck(checkedKey, treeDatas) {
      for (const treeData of treeDatas) {
        const {key} = treeData;
        if (key === checkedKey) {
          return treeData
        } else {
          const {children} = treeData;
          if (children) {
            return this.treeKeyCheck(checkedKey, children);
          }
        }
      }
    },
    refreshTreeMenu(dataRef, parentId, data) {
      if (!data) {
        return
      }

      for (const menu of data) {
        if (dataRef) {
          dataRef.children = []
          dataRef.children.push({
            id: menu.id,
            parentId: parentId,
            key: menu.id,
            title: menu.name
          });

          this.treeDatas = [...this.treeDatas]
        }
      }
    },
    indexOfPermits(menu, permit) {
      for (const bindPermit of this.bindPermits) {
        const {id, permitsIds} = bindPermit
        if (id === menu.id && permitsIds.indexOf(permit.funId) >= 0) {
          return true
        }
      }
      return false
    },
    permitsChange(e, menu, funcId) {
      for (const bindPermit of this.bindPermits) {
        const {id, permitsIds} = bindPermit
        if (id === menu.id) {
          const {checked} = e.target;
          if (checked) {
            permitsIds.push(funcId);
            return
          }

          permitsIds.forEach((item, index, arr) => {
            if (item === funcId) {
              arr.splice(index, 1);
            }
          })
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
