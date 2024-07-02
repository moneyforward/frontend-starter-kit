export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.APP_ENV === 'development') {
    const { server } = await import('@/mocks/node')
    server.listen()
  }
}
