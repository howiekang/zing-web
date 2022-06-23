export const columns = [
    {
        title: "名字",
        dataIndex: 'name'
    },
    {
        title: "状态",
        dataIndex: 'status',
        scopedSlots: {customRender: 'status'}
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: {
            customRender: 'action'
        }
    }
]



