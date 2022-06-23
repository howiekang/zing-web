import request, {PUBLIC_API_PATH} from "@/utils/request";

const api = {
    update: '/role' + PUBLIC_API_PATH.update,
    create: '/role' + PUBLIC_API_PATH.create,
    remove: '/role' + PUBLIC_API_PATH.delete,
    get: '/role' + PUBLIC_API_PATH.get,
    rolePage: '/role' + PUBLIC_API_PATH.page
}

/**
 * 创建角色信息
 * @param parameter
 * @returns {*}
 */
export function createRole(parameter) {
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
 * 获取角色
 * @param parameter
 * @returns {*}
 */
export function getRole(parameter) {
    return request({
        url: api.get,
        method: 'get',
        params: {id: parameter}
    })
}

/**
 * 角色分页查询
 * @param parameter
 * @returns {*}
 */
export function rolePage(parameter) {
    return request({
        url: api.rolePage,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

/**
 * 删除角色
 * @param parameter
 * @returns {*}
 */
export function removeRole(parameter) {
    return request({
        url: api.remove,
        method: 'post',
        params: {id: parameter}
    })
}

/**
 * 更新角色
 * @param parameter
 * @returns {*}
 */
export function updateRole(parameter) {
    return request({
        url: api.update,
        method: 'post',
        data: parameter
    })
}
