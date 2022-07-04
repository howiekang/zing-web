import request, {PUBLIC_API_PATH} from "@/utils/request";

const MODULE_NAME = "function";

const api = {
    Create: '/' + MODULE_NAME + PUBLIC_API_PATH.create,
    Page: '/' + MODULE_NAME + PUBLIC_API_PATH.page,
    List: '/' + MODULE_NAME + "/list"
}

/**
 * 创建功能信息
 * @param parameter
 * @returns {*}
 */
export function createFunc(parameter) {
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
 * 获取功能列表
 * @param parameter
 * @returns {*}
 */
export function funcPage(parameter) {
    return request({
        url: api.Page,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

/**
 * 获取功能列表
 * @returns {*}
 */
export function getFunctionList() {
    return request({
        url: api.List,
        method: 'get'
    })
}
