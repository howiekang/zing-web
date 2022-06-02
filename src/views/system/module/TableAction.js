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
        title: "状态",
        dataIndex: 'status'
    }
]

export function tableEvent(record, from) {
    return {
        on: {
            click: (event) => {
                from.open();
            }
        }
    }
}
