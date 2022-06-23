export const columns = [
    {
        title: "名字",
        dataIndex: 'name'
    },
    {
        title: "路径",
        dataIndex: 'path'
    },
    {
        title: "功能",
        dataIndex: 'function',
        scopedSlots: {customRender: 'function'}
    },
    {
        title: "状态",
        dataIndex: 'status',
        scopedSlots: {customRender: 'status'}
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: {customRender: 'action'}
    }
]
