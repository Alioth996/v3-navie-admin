<template>
    <div id="login">
        <n-button @click='userLogin'>登录</n-button>
    </div>
</template>

<script setup lang='ts'>

import {useMessage} from 'naive-ui'
import {login} from "../../api/user";

const nMessage = useMessage()

interface loginRes {
    code: string,
    token: string,
    message: string

}

const userLogin = async () => {
    const {token, message, code}: loginRes = await login()

    if (!token || code != 200) return

    localStorage.setItem('x-token', token)
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
  background-color: #ccc;
}
</style>