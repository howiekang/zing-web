import request from "@/utils/request";

const api = {
  userPage: '/user/page',
  getUserBindRoles: '/user/bind/info',
  bindRole: '/user/bind/role',
  unBindRole: '/user/unbind/role',
  UserInfo: '/user/info',
  OnlineUserInfo: '/user/online/info',
  UserPermissions: '/user/permissions'
}

/**
 * 获取用户分页查询
 * @param parameter 分页参数
 * @returns {*}
 */
export function userPage(parameter) {
  return request({
    url: api.userPage,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 用户绑定的角色
 * @param userId
 * @returns {*}
 */
export function getUserBindRoles(userId) {
  return request({
    url: api.getUserBindRoles,
    method: 'get',
    params: {userId}
  })
}

/**
 * 绑定角色
 * @param userId
 * @param roleIds
 * @returns {*}
 */
export function bindRole(userId, roleIds) {
  return request({
    url: api.bindRole,
    method: 'post',
    data: {userId, roleIds},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 解绑角色
 * @param userId
 * @param roleIds
 * @returns {*}
 */
export function unbindRole(userId, roleIds) {
  return request({
    url: api.unBindRole,
    method: 'post',
    data: {userId, roleIds},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 获取用户信息
 * @param userId
 * @returns {*}
 */
export function getUserInfo(userId) {
  return request({
    url: api.UserInfo,
    method: 'get',
    params: {userId}
  })
}

/**
 * 获取用户信息
 * @param userId
 * @returns {*}
 */
export function getOnlineUserInfo() {
  return request({
    url: api.OnlineUserInfo,
    method: 'get'
  })
}

/**
 * 获取用户的权限信息
 * @returns {*}
 */
export function getUserPermissions(){
  return request({
    url: api.UserPermissions,
    method: 'get'
  })
}
