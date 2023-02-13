import { request } from './request'
import { loginModelType, loginResOption } from '../@types/login'

export const userLoginApi = (data: loginModelType) =>
  request<loginResOption>({
    url: '/mock/login',
    data,
    method: 'Post'
  })

interface verifyCode extends resOption<verifyCode> {
  captcha: string
}

export const userLoginVerfiyCode = (data: { phone: string }) =>
  request<verifyCode>({
    url: '/mock/verify_code',
    method: 'post',
    data
  })
