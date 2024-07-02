import { ObjectSchema } from 'yup'

declare module 'yup' {
  interface ObjectSchema {
    dayjs(message: string): ObjectSchema<Dayjs>
    pastTime(message: string): ObjectSchema<Dayjs>
  }
}

declare module 'iron-session' {
  interface CookieStore {
    get: (name: string) =>
      | {
          name: string
          value: string
        }
      | undefined
    set: {
      (name: string, value: string, cookie?: Partial<ResponseCookie>): void
      (options: ResponseCookie): void
    }
  }
}
