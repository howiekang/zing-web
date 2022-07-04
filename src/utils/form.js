import {message} from "ant-design-vue";

/**
 * 表单
 * @param prefix
 * @param action
 */
export function createMsg(prefix, action, successCallback) {
  action.then(res => {
    const {data} = res
    if (data) {
      if (successCallback) {
        successCallback();
      }

      message.success(prefix + "保存成功")
    }
  }).catch(error => {
    message.warning("表单发生错误:" + error)
  })
}

export function updateMsg(prefix, action, successCallback) {
  action.then(res => {
    const {data} = res
    if (typeof data === 'boolean') {
      if (data) {
        if (successCallback) {
          successCallback();
        }
        message.success(prefix + "更新成功")
        return
      }
      message.warning(prefix + "更新失败")
      return;
    }
  }).catch(error => {
    message.warning("表单发生错误:" + error)
  })
}

export function deleteMsg(prefix, action) {
  action.then(res => {
    const {data} = res
    if (typeof data === 'boolean') {
      if (data) {
        message.success(prefix + "删除成功")
        return
      }
      message.warning(prefix + "删除失败")
      return;
    }
  }).catch(error => {
    message.warning("表单发生错误:" + error)
  })
}
