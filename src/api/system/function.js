import request from "@/utils/request";

const MODULE_NAME = "function";

const api = {
    list: '/' + MODULE_NAME + "/list"
}

/**
 * 获取功能列表
 * @returns {*}
 */
export function getFunctionList() {
    return request({
        url: api.list,
        method: 'get'
    })
}
