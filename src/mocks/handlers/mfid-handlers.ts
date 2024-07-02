import { MfidTokenRequest, MfidTokenResponse } from '@/app/api/auth/mfid/callback/route'
import { StatusCodes } from 'http-status-codes'
import { HttpHandler, HttpResponse, http } from 'msw'

const mfidHandlers: HttpHandler[] = [
  http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/mfid/token`, async ({ request }) => {
    const body = (await request.json()) as MfidTokenRequest

    const res = await fetch(`${process.env.NEXT_PUBLIC_MFID_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.NEXT_PUBLIC_MFID_CLIENT_ID}:${process.env.NEXT_PUBLIC_MFID_CLIENT_SECRET}`
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: body.code,
        nonce: body.nonce,
        redirect_uri: body.redirect_uri
      })
    })

    const data = (await res.json()) as MfidTokenResponse

    return HttpResponse.json(data, {
      status: StatusCodes.CREATED
    })
  })
]

export default mfidHandlers
