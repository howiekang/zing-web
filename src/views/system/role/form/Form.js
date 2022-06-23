import {showMsg} from "@/utils/request";
import {createRole, updateRole} from "@/api/system/role";

export const formState = {
    id: ["id",{}],
    name: [
        "name",
        {
            rules: [
                {
                    required: true,
                    message: '请输入角色名字'
                }, {
                    max: 255,
                    message: "最大长度255个字符"
                }, {
                    whitespace: true
                }
            ]
        }
    ],
    status: [
        "status",
        {
            initialValue: true
        }
    ]
}

/**
 * 表达的保存
 * @param form 表单对象
 */
export function saveForm(form) {
    form.validateFields((err, values) => {
        if (!err) {
            const {id} = values;
            if (id) {
                showMsg(updateRole(values));
                return;
            }
            showMsg(createRole(values))
        }
    });
}
