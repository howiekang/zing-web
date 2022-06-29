import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import {VueAxios} from './axios'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {message} from "ant-design-vue";
import {boolean} from "mockjs2/src/mock/random/basic";

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response token interceptor
request.interceptors.response.use((response) => {
  const {headers: {authorization}} = response
  if (authorization) {
      storage.set(ACCESS_TOKEN,authorization)
  }
  return response
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return responseProcess(response);
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}

/**
 * 系统的请求状态
 * @type {{success: number}}
 */
const RESULT_CODE = {
  success: 200,
}

/**
 * 公共api路径
 * @type {{enable: string, disable: string, get: string, create: string, page: string, delete: string}}
 */
export const PUBLIC_API_PATH = {
  create: "/create",
  page: "/page",
  info: "/info",
  delete: "/delete",
  enable: "/enable",
  disable: "/disable",
  update: "/update",
}

/**
 * 响应的内容处理
 * @param response 响应信息
 * @returns {*}
 */
function responseProcess(response) {
  const {code, msg} = response.data;
  if (code && msg) {
    if (code !== RESULT_CODE.success) {
      message.error(msg);
    }
  }
  return response.data;
}

/**
 * 响应结果展示
 * @param reqAction
 */
export function showMsg(reqAction) {
  reqAction.then(resp => {
    const {code, data, msg} = resp;
    if (code !== RESULT_CODE.success) {
      return;
    }

    if (data && data instanceof boolean) {
      if (msg) {
        message.info(msg);
        return;
      }

      if (data) {
        message.info("成功");
      } else {
        message.warning("失败");
      }
      return;
    }
    if (msg) {
      message.info(msg);
    }
  }).catch(err => {
    message.error(err);
  });
}

/**
 * 获取返回的Data
 * @param reqAction
 * @returns {Promise<*>}
 */
export async function convertResponse(reqAction) {
  return await reqAction.then(resp => {
    console.log("data resp", resp.data)
    return resp.data;
  });
}
