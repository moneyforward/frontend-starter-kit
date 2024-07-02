'use server'

import { CookieStore, getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

import { SessionData, sessionOptions } from '@/lib/session'

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies() as CookieStore, sessionOptions)

  return session
}

export async function handleDeleteSession() {
  const session = await getSession()

  session.destroy()
}
