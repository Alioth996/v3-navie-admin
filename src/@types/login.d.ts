export interface loginModelType {
  username: string
  password: string
}

interface loginResOption extends resOption<loginResOption> {
  token: string
}
