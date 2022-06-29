import request, {PUBLIC_API_PATH} from "@/utils/request";

const api = {
    update: '/api' + PUBLIC_API_PATH.update,
    create: '/api' + PUBLIC_API_PATH.create,
    remove: '/api' + PUBLIC_API_PATH.delete,
    info: '/api' + PUBLIC_API_PATH.info,
    page: '/api' + PUBLIC_API_PATH.page,
    apiPermits: '/api/permits',
    apiPermitsType: '/api/permits/type'
}

/**
 * 创建api信息
 * @param parameter
 * @returns {*}
 */
export function createApi(parameter) {
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
 * 获取api
 * @param parameter
 * @returns {*}
 */
export function getApi(parameter) {
    return request({
        url: api.info,
        method: 'get',
        params: {id: parameter}
    })
}

/**
 * api分页查询
 * @param parameter
 * @returns {*}
 */
export function apiPage(parameter) {
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
 * 删除api
 * @param parameter
 * @returns {*}
 */
export function removeApi(parameter) {
    return request({
        url: api.remove,
        method: 'post',
        params: {id: parameter}
    })
}

/**
 * 更新api
 * @param parameter
 * @returns {*}
 */
export function updateApi(parameter) {
    return request({
        url: api.update,
        method: 'post',
        data: parameter
    })
}

/**
 * 获取全部的api权限类型
 * @returns {*}
 */
export function getApiPermits() {
    return request({
        url: api.apiPermits,
        method: 'get'
    })
}

/**
 * 获取全部的api权限类型
 * @returns {*}
 */
export function getApiPermitsType() {
    return request({
        url: api.apiPermitsType,
        method: 'get'
    })
}
