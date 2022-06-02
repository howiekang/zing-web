import request from "@/utils/request";

const api = {
    getModuleList: '/module/page'
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
