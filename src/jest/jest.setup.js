import { enableFetchMocks } from 'jest-fetch-mock'
import mockRouter from 'next-router-mock'

enableFetchMocks()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    ...mockRouter,
    refresh: jest.fn()
  })
}))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})
