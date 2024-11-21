import { NextRequest } from 'next/server'

import { absoluteUrl } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const data = await request.json()

  return fetch(absoluteUrl('/posts'), {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export const dynamic = 'force-dynamic'
