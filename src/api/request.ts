import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: '/',
    timeout: 3000
})


instance.interceptors.response.use(async res => {
    const {code, message} = res.data
    if (code >= 400) {
        // @ts-ignore
        return Promise.reject(message)
    }
    return res.data
})

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    return await instance.request(config)

}


