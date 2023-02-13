import {token, userList} from "./user";

import Mock from 'mockjs'


const useMock = () => {
    Mock.mock('/mock/login', {
        code: '200',
        message: '登录成功',
        token
    })
    Mock.mock('/mock/user',userList )
}

export default useMock
