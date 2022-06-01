export const columns = [
    {
        title: "昵称",
        dataIndex: 'nick'
    },
    {
        title: "头像",
        dataIndex: 'headImageUrl',
        scopedSlots: {customRender: 'avatar'}
    },
    {
        title: "姓名",
        dataIndex: 'userName'
    },
    {
        title: "手机号",
        dataIndex: 'telPhone'
    },
    {
        title: "邮箱",
        dataIndex: 'email'
    },
    {
        title: "状态",
        dataIndex: 'status',
        scopedSlots: {customRender: 'badge'}
    },
    {
        title: "注册时间",
        dataIndex: 'regTime'
    },
    {
        fixed: "right",
        align: 'center',
        scopedSlots: {
            customRender: 'action',
            title: 'table-action-title'
        }
    }
]



