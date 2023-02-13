import {request} from "./request";
import {loginModelType, loginResOption} from "../@types/login";


export const userLoginApi = (data: loginModelType) => request<loginResOption>({
    url: '/mock/login',
})

