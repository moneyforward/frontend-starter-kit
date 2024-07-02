import { SessionOptions } from 'iron-session'

export interface SessionData {
  state: string
  nonce: string
  redirectUrl: string
  accessToken: string
  refreshToken: string
}

export const sessionOptions: SessionOptions = {
  password: 'dU#2-</£53jcX[jT%F9Zr0XOV%24>63V',
  cookieName: 'session-auth',
  cookieOptions: {
    secure: true
  }
}
