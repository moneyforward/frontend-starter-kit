import humps from 'humps'

import { absoluteUrl } from '../utils'
import { IPost } from '@/types/post'
import { IResult } from '@/types/result'

export interface SearchParams {
  page?: string
}

export async function getPosts(searchParams: SearchParams): Promise<IResult<IPost[]> | undefined> {
  const { page } = searchParams
  const metadata: any = {
    page: {
      size: 25,
      number: page ? Number(page) : 1
    }
  }

  const payload = metadata
  const response = await fetch(absoluteUrl('/posts/search'), {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    return undefined
  }

  const result = await response.json()
  return result
}

export async function getPost(id: string): Promise<IPost | undefined> {
  const response = await fetch(absoluteUrl(`/posts/${id}`), {
    method: 'GET',
    cache: 'no-cache'
  })

  if (!response.ok) {
    return undefined
  }

  const result = await response.json()
  const camelizedResult = humps.camelizeKeys(result) as IResult<IPost>
  return camelizedResult.data
}
