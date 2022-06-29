import {createMenu, updateMenu} from "@/api/system/module";
import {showMsg} from "@/utils/request";

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
 * @param bindFuncList
 */
export function saveForm(form, bindFuncList) {
    form.validateFields((err, values) => {
        if (!err) {
            values.funcIds = bindFuncList;
            const {id} = values;
            if (id) {
                showMsg(updateMenu(values));
                return;
            }
            showMsg(createMenu(values));
        }
    });
}
