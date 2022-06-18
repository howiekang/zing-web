import request, {PUBLIC_API_PATH} from "@/utils/request";

const api = {
    createModule: '/module' + PUBLIC_API_PATH.create,
    removeModule: '/module' + PUBLIC_API_PATH.delete,
    getModuleList: '/module' + PUBLIC_API_PATH.page
}

/**
 * 创建模块信息
 * @param parameter
 * @returns {*}
 */
export function createModule(parameter) {
    return request({
        url: api.createModule,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
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
        url: api.removeModule,
        method: 'post',
        data: {id: parameter}
    })
}
