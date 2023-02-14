<template>
    <div id="login">
        <div class="login-form">
            <n-card :bordered="false">
                <header class="logo-box">
                    <img src="../../assets/images/logo.png">
                </header>
                <n-form ref="loginFormRef" label-placement="left" :model="loginModel" :rules="Loginrules">
                    <n-form-item path="username">
                        <n-input v-model:value="loginModel.username" size="large" @keydown.enter.prevent
                            placeholder="Enterusername..." />
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input v-model:value="loginModel.password" placeholder="Enter password" size="large"
                            type="password" @keydown.enter.prevent />
                    </n-form-item>

                    <n-form-item path="password">
                        <n-input v-model:value="loginModel.phone" placeholder="Enter phone" size="large"
                            @keydown.enter.prevent />
                    </n-form-item>
                    <n-form-item path="password">
                        <div class="verfiy-code-box">
                            <n-input v-model:value="loginModel.verify_code" size="large" placeholder="Enter verfiy-code"
                                @keydown.enter.prevent />
                            <n-button size="large" ghost :disabled="disabled" @click="getVerifyCode">{{
                                label
                            }}</n-button>
                        </div>

                    </n-form-item>
                    <n-form-item>
                        <n-button type='primary' size="large" block ghost @click="handleValidateClick">登录</n-button>
                    </n-form-item>
                </n-form>

            </n-card>

        </div>
    </div>

</template>

<script setup lang='ts'>

import {FormInst, FormRules, useMessage, useNotification} from 'naive-ui'
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';


import {loginModelType} from '../../@types/login';
import {userLoginApi, userLoginVerfiyCode} from "../../api/user";
import {useStorage} from "../../hooks";

// 按钮倒计时功能
import useCount from './hook/useSmScode'

const { disabled, label, startCount } = useCount()


const nMessage = useMessage()
const notification = useNotification()

const router = useRouter()

const loginFormRef = ref<FormInst | null>(null)
const loginModel = reactive<loginModelType>({
    username: 'admin',
    password: '123456',
    verify_code: '',
    phone: ''
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
    ]

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


const getVerifyCode = async () => {
    const { captcha, message } = await userLoginVerfiyCode({ phone: loginModel.phone })
    if (captcha) {
        notification.success({
            content: message,
            meta: `验证码:${captcha} 20分钟内有效`,
            duration: 1000 * 5

        })
        startCount()
        loginModel.verify_code = captcha
    }

}
const userLogin = async () => {
    const { token, message } = await userLoginApi(loginModel)
    const useLocal = useStorage()
    useLocal.set('x-token', token)
    await router.replace('/home')
    nMessage.success(message)
    // 清空路由表
    // location.reload()
}



</script>

<style scoped lang="less">
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

            .verfiy-code-box {
                width: 100%;
                display: flex;
                justify-content: space-between;
                gap: 20px;
            }
        }


    }
}
</style>