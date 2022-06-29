import {getUserPermissions} from '@/api/system/user'
import {welcome} from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {name, welcome}) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {

    // 获取用户信息
    GetUserPermissions({commit}) {
      return new Promise((resolve, reject) => {
        getUserPermissions().then(response => {
          const result = convert(response.data)

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => {
                  return action.action
                })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => {
              return permission.permissionId
            })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', {name: result.name, welcome: welcome()})
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user

/**
 * 转换到数据
 * @param userPermission
 * @returns {{role: {permissions: *[]}, name, telephone, id, avatar, username, status}}
 */
function convert(userPermission) {
  const {
    userId,
    nick,
    userName,
    avatar,
    status,
    telPhone,
    menuPermissions
  } = userPermission;
  let permissionList = []

  if (menuPermissions) {
    for (const menuPermission of menuPermissions) {
      const {menuCode, menuName, actions, permissions} = menuPermission;

      if (permissions) {
        let actionEntitySet = []
        for (const permission of permissions) {
          const {code, desc} = permission;
          actionEntitySet.push({
            action: code,
            describe: desc,
            defaultCheck: false
          })
        }

        permissionList.push({
          permissionId: menuCode,
          permissionName: menuName,
          actions,
          actionEntitySet
        })
      }
    }
  }

  return {
    id: userId,
    name: nick,
    username: userName,
    avatar,
    status,
    telephone: telPhone,
    role: {
      permissions:permissionList
    }
  }
}
