import request from "@/utils/request";

const api = {
    getUserList: '/user/page'
}

/**
 * 获取用户分页查询
 * @param parameter 分页参数
 * @returns {*}
 */
export function getUserList(parameter) {
    return request({
        url: api.getUserList,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
