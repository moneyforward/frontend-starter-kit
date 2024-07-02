/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { env } from 'next-runtime-env'

const MFID_BASE_URL = env('NEXT_PUBLIC_MFID_BASE_URL')!
const MFID_CLIENT_ID = env('NEXT_PUBLIC_MFID_CLIENT_ID')!
const MFID_SCOPE = 'openid email'
const MFID_RESPONSE_TYPE = 'code'
const MFID_PROMPT = 'select_account'

export interface IMfidAuthParams {
  state: string
  nonce: string
  redirectUrl: string
  loginHint?: string
}

export function buildRedirectUrl(baseUrl: string): string {
  return `${baseUrl}/user/auth/mfid/callback`
}

export function buildMfidAuthUrl({ state, nonce, redirectUrl, loginHint }: IMfidAuthParams): string {
  const query = new URLSearchParams({
    client_id: MFID_CLIENT_ID,
    redirect_uri: redirectUrl,
    response_type: MFID_RESPONSE_TYPE,
    scope: MFID_SCOPE,
    state,
    nonce
  })

  if (loginHint) {
    query.set('login_hint', loginHint)
  } else {
    query.set('prompt', MFID_PROMPT)
  }

  return `${MFID_BASE_URL}/oauth/authorize?${query}`
}

export function buildLogoutUrl(redirectUrl: string): string {
  const query = new URLSearchParams({
    client_id: MFID_CLIENT_ID,
    post_logout_redirect_uri: redirectUrl
  })

  return `${MFID_BASE_URL}/end_session?${query}`
}
