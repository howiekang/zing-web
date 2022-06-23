import request, {PUBLIC_API_PATH} from "@/utils/request";

const MODULE_NAME = "module";

const api = {
    update: '/' + MODULE_NAME + PUBLIC_API_PATH.update,
    create: '/' + MODULE_NAME + PUBLIC_API_PATH.create,
    remove: '/' + MODULE_NAME + PUBLIC_API_PATH.delete,
    get: '/' + MODULE_NAME + PUBLIC_API_PATH.get,
    getModuleList: '/' + MODULE_NAME + PUBLIC_API_PATH.page
}

/**
 * 创建模块信息
 * @param parameter
 * @returns {*}
 */
export function createModule(parameter) {
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
export function getModule(parameter) {
    return request({
        url: api.get,
        method: 'get',
        params: {id: parameter}
    })
}

/**
 * 获取模块列表
 * @param parameter
 * @returns {*}
 */
export function getModuleList(parameter) {
    return request({
        url: api.getModuleList,
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
export function removeModule(parameter) {
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
export function updateModule(parameter) {
    return request({
        url: api.update,
        method: 'post',
        data: parameter
    })
}
