import { HttpHandler } from 'msw'

import mfidHandlers from './mfid-handlers'

const handlers: HttpHandler[] = [...mfidHandlers]

export default handlers
