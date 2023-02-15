import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "/",
  timeout: 3000,
});

instance.interceptors.response.use(async (res) => {
  return res.data;
});

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  return await instance.request(config);
};
