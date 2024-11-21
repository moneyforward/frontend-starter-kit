import { HttpHandler } from 'msw'

import mfidHandlers from './mfid-handlers'
import postHandlers from './post-handlers'

const handlers: HttpHandler[] = [...mfidHandlers, ...postHandlers]

export default handlers
