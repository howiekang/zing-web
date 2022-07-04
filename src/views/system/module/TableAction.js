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
        title: "图标",
        dataIndex: 'icon'
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
