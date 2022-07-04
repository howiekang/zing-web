import {createMenu, updateMenu} from "@/api/system/module";
import {createMsg, updateMsg} from "@/utils/form";

export const formState = {
  id: ["id", {}],
  name: [
    "name",
    {
      rules: [
        {
          required: true,
          message: '请输入模块名字'
        }, {
          max: 255,
          message: "最大长度255个字符"
        }, {
          whitespace: true
        }
      ]
    }
  ],
  path: [
    "path",
    {
      rules: [
        {
          required: true,
          message: '请输入模块路径'
        }, {
          max: 255,
          message: "最大长度255个字符"
        }, {
          whitespace: true
        }
      ]
    }
  ],
  code: [
    "code",
    {
      rules: [
        {
          required: true,
          message: '请输入模块Code'
        }, {
          max: 255,
          message: "最大长度255个字符"
        }, {
          whitespace: true
        }
      ]
    }
  ],
  parentId: [
    "parentId",
    {
      rules: [
        {
          required: true,
          message: '请选择父级模块'
        }
      ]
    }
  ],
  status: [
    "status",
    {
      initialValue: true,
      valuePropName: "checked"
    }
  ],
  extendData: [
    "extendData"
  ]
}

/**
 * 表达的保存
 * @param form 表单对象
 * @param bindPermitsIds
 */
export function saveForm(form, bindPermitsIds) {
  form.validateFields((err, values) => {
    if (err) {
      return
    }

    values.permitsIds = bindPermitsIds;
    const {id} = values;
    if (id) {
      updateMsg("菜单", updateMenu(values))
      return
    }
    createMsg("菜单", createMenu(values));
  });
}
