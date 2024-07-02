const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const CSRF_TOKEN_KEY = ''

type TRestClientArgs = {
  url: string
  skipCsrf?: boolean
  contentType?: string
} & RequestInit

const restClient = ({
  url = BASE_URL,
  skipCsrf,
  credentials = 'include',
  contentType = 'application/json',
  ...rest
}: TRestClientArgs): Promise<Response> => {
  let headers = {
    ...rest.headers
  }

  if (!skipCsrf) {
    headers = {
      ...headers,
      ...{
        'X-CSRF-TOKEN': CSRF_TOKEN_KEY,
        'Cache-Control': 'no-cache, no-store',
        Pragma: 'no-cache',
        Expires: '0'
      }
    }
  }

  if (contentType) {
    headers = {
      ...headers,
      'Content-Type': contentType
    }
  }

  return fetch(url, {
    ...rest,
    credentials,
    headers
  })
}

export default restClient
