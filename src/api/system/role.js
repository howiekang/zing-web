import request, {PUBLIC_API_PATH} from "@/utils/request";

const api = {
    update: '/role' + PUBLIC_API_PATH.update,
    create: '/role' + PUBLIC_API_PATH.create,
    remove: '/role' + PUBLIC_API_PATH.delete,
    info: '/role' + PUBLIC_API_PATH.info,
    page: '/role' + PUBLIC_API_PATH.page,
    RolePermits: '/role/permits'
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
        url: api.info,
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
        url: api.page,
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

/**
 * 获取角色的权限
 * @param roleId
 * @returns {*}
 */
export function getRolePermits(roleId){
    return request({
        url: api.RolePermits,
        method: 'get',
        params: {roleId}
    })
}
