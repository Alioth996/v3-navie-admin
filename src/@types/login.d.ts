export interface loginModelType {
  username: string
  password: string
  verify_code: string
  phone: string
}

interface loginResOption extends resOption<loginResOption> {
  token: string
}
