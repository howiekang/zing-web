export const formState = {
    id: ["id",{initialValue:null,}],
    name: [
        "name",
        {
            initialValue:"",
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
            initialValue: true,
            valuePropName:"checked"
        }
    ]
}
