import Mock from "mockjs2";
import {builderPage} from "@/mock/util";

const userList = (options) => {

    return builderPage(options, i => {
        let isEnable = i % 2 === 0;

        return {
            id: i,
            roleId: i + 1,
            nick: '昵称',
            headImageUrl: 'https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg',
            userName: '小可爱',
            telPhone: '15522133631',
            email: '3329743655@qq.com',
            isEnable: isEnable,
            regTime: '2021-09-10 17:58:59'
        }
    })
}

Mock.mock(/\/system\/user\/list/, 'get', userList)
