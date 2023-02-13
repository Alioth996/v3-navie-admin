<template>
    <div id="login">
        <n-form ref="loginFormRef" label-placement="left" :model="loginModel" :rules="Loginrules">
            <n-form-item path="username" label="账号">
                <n-input v-model:value="loginModel.username" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item path="password" label="密码">
                <n-input v-model:value="loginModel.password" type="password" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item>
                <n-button @click="handleValidateClick">登录</n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup lang='ts'>

import { useMessage, FormRules, FormInst } from 'naive-ui'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginModelType, loginRes } from '../../@types/Login';
import { login } from "../../api/user";
import { useStorage } from "../../hooks";


const nMessage = useMessage()
const router = useRouter()


const loginFormRef = ref<FormInst | null>(null)
const loginModel = ref<loginModelType>({
    username: 'admin',
    password: '123456'
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

const userLogin = async () => {
    const { token, message, code }: loginRes = await login()
    if (!token || code != 200) return
    const useLocal = useStorage()
    useLocal.set('x-token', token)
    await router.replace('/home')
    nMessage.success(message)


}

</script>

<style scoped lang="less">
#login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    // background-color: #ccc;
}
</style>