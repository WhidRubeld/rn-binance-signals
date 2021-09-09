export interface IAuth {
  access_token: string
}

export interface AuthForm {
  username: string
  password: string
}

export interface PasswordForm {
  oldPassword: string
  newPassword: string
}
