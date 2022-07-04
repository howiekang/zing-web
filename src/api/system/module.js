import request, {PUBLIC_API_PATH} from "@/utils/request";

const MODULE_NAME = "menu";

const api = {
  update: '/' + MODULE_NAME + PUBLIC_API_PATH.update,
  Create: '/' + MODULE_NAME + PUBLIC_API_PATH.create,
  remove: '/' + MODULE_NAME + PUBLIC_API_PATH.delete,
  info: '/' + MODULE_NAME + PUBLIC_API_PATH.info,
  page: '/' + MODULE_NAME + PUBLIC_API_PATH.page,
  MenuPermits: '/' + MODULE_NAME + "/permits",
  BindPermitsIds: '/' + MODULE_NAME + "/bind/permits/ids",
  TopLevelMenuList: '/' + MODULE_NAME + "/top-level/list",
  SubList: '/' + MODULE_NAME + "/sub/list",
  MenuList: '/' + MODULE_NAME + "/menu/list"
}

/**
 * 创建模块信息
 * @param parameter
 * @returns {*}
 */
export function createMenu(parameter) {
  return request({
    url: api.Create,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 获取模块
 * @param parameter
 * @returns {*}
 */
export function getMenu(parameter) {
  return request({
    url: api.info,
    method: 'get',
    params: {id: parameter}
  })
}

/**
 * 获取模块列表
 * @param parameter
 * @returns {*}
 */
export function menuPage(parameter) {
  return request({
    url: api.page,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 删除模块
 * @param parameter
 * @returns {*}
 */
export function removeMenu(parameter) {
  return request({
    url: api.remove,
    method: 'post',
    params: {id: parameter}
  })
}

/**
 * 更新模块
 * @param parameter
 * @returns {*}
 */
export function updateMenu(parameter) {
  return request({
    url: api.update,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取模块的权限
 * @returns {*}
 */
export function getMenuPermits() {
  return request({
    url: api.MenuPermits,
    method: 'get',
  })
}

/**
 * 绑定的功能列表
 * @param moduleId
 * @returns {*}
 */
export function getBindPermitsIds(moduleId) {
  return request({
    url: api.BindPermitsIds,
    method: 'get',
    params: {moduleId}
  })
}

/**
 * 获取顶级的模块列表
 * @returns {*}
 */
export function getTopLevelMenuList() {
  return request({
    url: api.TopLevelMenuList,
    method: 'get'
  })
}

/**
 * 获取子模块列表
 * @returns {*}
 */
export function getSubList(searchDesc) {
  return request({
    url: api.SubList,
    method: 'post',
    data: searchDesc
  })
}

/**
 * 获取模块列表
 * @returns {*}
 */
export function getMenuList() {
  return request({
    url: api.MenuList,
    method: 'get'
  })
}
