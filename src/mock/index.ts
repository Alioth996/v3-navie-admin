import { token, userList } from "./user";

import Mock from "mockjs";
import { loginModelType, loginResOption } from "../@types/login";

let captcha: string;

const useMock = () => {
  Mock.mock("/mock/login", "post", (option: any) => {
    const { username, password, verify_code } = JSON.parse(
      option.body
    ) as loginModelType;

    if (verify_code == captcha) {
      if (username !== "admin" || !password) {
        return {
          data: null,
          code: 400,
          message: "用户名或密码错误",
        } as resOption<null>;
      } else {
        return {
          data: null,
          token,
          code: 200,
          message: "success",
        } as resOption<loginResOption>;
      }
    } else {
      return {
        data: null,
        code: 400,
        message: "验证码错误",
      } as resOption<null>;
    }
  });

  Mock.mock("/mock/verify_code", "post", (option: any) => {
    captcha = Math.random().toFixed(6).slice(-6);
    return {
      data: null,
      captcha,
      code: 200,
      message: "验证码获取成功",
    } as resOption<null>;
  });
  Mock.mock("/mock/user", userList);
};

export default useMock;
