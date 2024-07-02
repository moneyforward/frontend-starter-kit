import { getSession } from '@/actions/session'
import { NextRequest, NextResponse } from 'next/server'

import { absoluteUrl } from '@/lib/utils'

export interface MfidTokenRequest {
  code: string
  nonce: string
  redirect_uri: string
}

export interface MfidTokenResponse {
  token_type: string
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
  scope: string
}

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get('state') as string
  const code = req.nextUrl.searchParams.get('code') as string
  const session = await getSession()

  const loginUrl = new URL(`${req.nextUrl.origin}/user/login`)
  if (!code || !state || state !== session.state) {
    return NextResponse.redirect(loginUrl)
  }

  const payload: MfidTokenRequest = {
    code,
    nonce: session.nonce || '',
    redirect_uri: session.redirectUrl || ''
  }

  // Call the token API if the states match
  try {
    const res = await fetch(absoluteUrl('/auth/mfid/token'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (res.status === 201) {
      const data = (await res.json()) as MfidTokenResponse
      session.accessToken = data.access_token
      session.refreshToken = data.refresh_token
      await session.save()

      const homeUrl = new URL(req.nextUrl.origin)
      return NextResponse.redirect(homeUrl)
    }
  } catch (_) {}

  return NextResponse.redirect(loginUrl)
}

export const dynamic = 'force-dynamic'
