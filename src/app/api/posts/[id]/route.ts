import { NextRequest } from 'next/server'

import { absoluteUrl } from '@/lib/utils'

interface Props {
  params: {
    id: string
  }
}

export async function PUT(request: NextRequest, props: Props) {
  const data = await request.json()

  return fetch(absoluteUrl(`/posts/${props.params.id}`), {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export async function DELETE(request: NextRequest, props: Props) {
  return fetch(absoluteUrl(`/posts/${props.params.id}`), {
    method: 'DELETE'
  })
}

export const dynamic = 'force-dynamic'
