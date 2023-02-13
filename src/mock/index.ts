import { token, userList } from './user'

import Mock from 'mockjs'
import { loginResOption } from '../@types/login'

const useMock = () => {
  Mock.mock('/mock/login', 'post', (option: any) => {
    return {
      data: token,
      code: 200,
      message: 'success'
    } as resOption<loginResOption>
  })

  Mock.mock('/mock/verify_code', 'post', (option: any) => {
    const { phone } = JSON.parse(option.body)
    const captcha = Math.random().toFixed(6).slice(-6)
    return {
      data: null,
      captcha,
      code: 200,
      message: '验证码获取成功'
    } as resOption<null>
  })
  Mock.mock('/mock/user', userList)
}

export default useMock
