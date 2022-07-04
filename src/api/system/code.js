import request from "@/utils/request";

const api = {
  LoginCode: "/verify-code/login"
}

/**
 * 获取登录验证码
 * @returns {*}
 */
export function getLoginCode() {
  return request({
    url: api.LoginCode,
    method: 'get'
  })
}
