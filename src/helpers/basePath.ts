export const addBasePathPrefix = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`
