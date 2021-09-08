import { MODE, DEV_API_URL, PROD_API_URL } from '@env'
import { AuthForm, IAuth, IProfile } from '@interfaces'
import axios from 'axios'

const API_URL = MODE === 'development' ? DEV_API_URL : PROD_API_URL

const Routers = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  profile: `${API_URL}/user/me`,
}

export class HttpService {
  static setToken(token: string): void {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  static removeToken(): void {
    delete axios.defaults.headers.common.Authorization
  }

  static getToken(): string | null {
    return axios.defaults.headers.common.Authorization
  }
}

export class ApiService {
  static async login(form: AuthForm): Promise<IAuth> {
    return new Promise<IAuth>((resolve, reject) => {
      axios
        .post(Routers.login, form)
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err))
    })
  }

  static async register(form: AuthForm): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios
        .post(Routers.register, form)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  }

  static async profile(): Promise<IProfile> {
    return new Promise<IProfile>((resolve, reject) => {
      axios
        .get(Routers.profile)
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err))
    })
  }
}
