import {createModule} from "@/api/system/module";
import {showMsg} from "@/utils/request";

export const formState = {
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
    ], path: [
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
    ], status: [
        "status",
        {
            initialValue:true
        }
    ]
}

/**
 * 表达的保存
 * @param form 表单对象
 */
export function saveForm(form) {
    form.validateFields((err, values) => {
        if(!err){
            showMsg(createModule(values))
        }
    });
}
