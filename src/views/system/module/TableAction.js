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
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: {customRender: 'action'},
    }
]

/**
 * 表格的行点击事件
 * @param record 记录
 * @param from 表单引用
 * @returns {{on: {click: on.click}}}
 */
export function tableEventCustom(record, from) {
    return {
        on: {
            dblclick: (event) => {
                from.open();
            }
        }
    }
}

export function rowRemove(record){

}
