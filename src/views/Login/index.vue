<template>
    <div id="login">
        <div class="login-form">
            <n-card :bordered="false">
                <header class="logo-box">
                    <img src="../../assets/images/logo.png">
                </header>
                <n-form ref="loginFormRef" :model="loginModel" :rules="Loginrules" label-placement="left">
                    <n-form-item path="username">
                        <n-input v-model:value="loginModel.username" placeholder="Enter username..." size="large"
                                 @keydown.enter.prevent/>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input v-model:value="loginModel.password" placeholder="Enter password" size="large"
                                 type="password" @keydown.enter.prevent/>
                    </n-form-item>

                    <n-form-item path="phone">
                        <n-input v-model:value="loginModel.phone" placeholder="Enter phone" size="large"
                                 @keydown.enter.prevent/>
                    </n-form-item>
                    <n-form-item path="verify_code">
                        <div class="verify-code-box">
                            <n-input v-model:value="loginModel.verify_code" placeholder="Enter verify-code" size="large"
                                     @keydown.enter.prevent/>
                            <n-button :disabled="disabled" ghost size="large" @click="getVerifyCode">{{
                                label
                                }}
                            </n-button>
                        </div>

                    </n-form-item>
                    <n-form-item>
                        <n-button block ghost size="large" type='primary' @click="handleValidateClick">登录</n-button>
                    </n-form-item>
                </n-form>

            </n-card>

        </div>
    </div>

</template>

<script lang='ts' setup>

import {FormInst, FormRules, useMessage, useNotification} from 'naive-ui'
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';

import {loginModelType} from '../../@types/login';
import {userLoginApi, userLoginVerfiyCode} from "../../api/user";
// 按钮倒计时功能
import useCount from './hook/useSmScode'
import {useStorage} from "../../hooks/common";

const router = useRouter()

const {disabled, label, startCount} = useCount()

// 消息提示
const nMessage = useMessage()
const notification = useNotification()


// 登录模块
const useLocal = useStorage()
const loginFormRef = ref<FormInst | null>(null)
const loginModel = reactive<loginModelType>({
    username: 'admin',
    password: '123456',
    verify_code: '',
    phone: '1333456836'
})
const Loginrules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入账号'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码'
        }
    ],
    phone: [
        {
            key: 'phone',
            required: true,
            message: '请输入手机号',
        }
    ],
    verify_code: [{
        required: true,
        message: '验证码',
        trigger: 'blur'
    }]

}

const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault()
    loginFormRef.value?.validate((errors) => {
        if (!errors) {
            userLogin()
        } else {
            console.log(errors)
            nMessage.error('必填项未填写!!')
        }
    })
}


// 验证手机号
async function validatePhone() {
    return loginFormRef.value?.validate(
        (errors) => {
            if (errors) {
                console.error(errors)
            }
        },
        (rule) => {
            return rule?.key === 'phone'
        }
    )
}

const getVerifyCode = async () => {
    // 1. 验证手机号正确性
    await validatePhone()

    // 获取验证码
    const {captcha, message} = await userLoginVerfiyCode({phone: loginModel.phone})
    if (captcha) {
        notification.success({
            content: message,
            meta: `验证码:${captcha} 20分钟内有效`,
            duration: 1000 * 5

        })
        // 开启倒计时
        startCount()
        loginModel.verify_code = captcha
    }

}
const userLogin = async () => {
    const {token, message} = await userLoginApi(loginModel)

    if (!token) {
        nMessage.error(message)
        return

    }
    useLocal.set('x-token', token)
    nMessage.success(() => message == 'success' ? '登录成功' : message)
    // await router.replace('/home')
    // 清空路由表
    // location.reload()
}


</script>

<style lang="less" scoped>
#login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url("../../assets/images/bg.png") no-repeat bottom left;

  .login-form {
    margin-right: 200px;
    box-shadow: 0 0 5px #00000010;
    width: 400px;
    min-height: 360px;
    border: 1px solid #18a058;
    border-radius: 20px;

    .n-card {
      height: 100%;

      header {
        height: 180px;
        text-align: center;

        img {
          display: inline-block;
          height: 100%;
        }
      }

      .verify-code-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 20px;
      }
    }


  }
}
</style>