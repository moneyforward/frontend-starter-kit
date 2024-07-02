export enum ErrorCode {
  ACCESS_PERMISSION_REQUIRED = 'access_permission_required'
}

export type ServerError = {
  status: number
  code: ErrorCode
  title: string
  detail: string
}
