export const formState = {
    apiId: ["apiId", {}],
    name: [
        "name",
        {
            rules: [
                {
                    required: true,
                    message: '请输入api名字'
                }, {
                    max: 255,
                    message: "最大长度255个字符"
                }, {
                    whitespace: true
                }
            ]
        }
    ],
    permitsIds: ["permitsIds", {}],
    apiUrl: [
        "apiUrl",
        {
            rules: [
                {
                    required: true,
                    message: '请输入Api路径'
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
