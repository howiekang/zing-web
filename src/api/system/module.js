import request, {PUBLIC_API_PATH} from "@/utils/request";

const MODULE_NAME = "menu";

const api = {
    update: '/' + MODULE_NAME + PUBLIC_API_PATH.update,
    create: '/' + MODULE_NAME + PUBLIC_API_PATH.create,
    remove: '/' + MODULE_NAME + PUBLIC_API_PATH.delete,
    info: '/' + MODULE_NAME + PUBLIC_API_PATH.info,
    page: '/' + MODULE_NAME + PUBLIC_API_PATH.page,
    modulePermits: '/' + MODULE_NAME + "/permits",
    bindPermitsIds: '/' + MODULE_NAME + "/bind/permits/ids",
    topLevelModuleList: '/' + MODULE_NAME + "/top-level/list",
    childrenList: '/' + MODULE_NAME + "/children/list",
    menuList: '/' + MODULE_NAME + "/menu/list"
}

/**
 * 创建模块信息
 * @param parameter
 * @returns {*}
 */
export function createMenu(parameter) {
    return request({
        url: api.create,
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
        url: api.modulePermits,
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
        url: api.bindPermitsIds,
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
        url: api.topLevelModuleList,
        method: 'get'
    })
}

/**
 * 获取顶级的模块列表
 * @returns {*}
 */
export function getChildrenList(moduleId) {
    return request({
        url: api.childrenList,
        method: 'get',
        params:{moduleId}
    })
}

/**
 * 获取模块列表
 * @returns {*}
 */
export function getMenuList() {
    return request({
        url: api.menuList,
        method: 'get'
    })
}
