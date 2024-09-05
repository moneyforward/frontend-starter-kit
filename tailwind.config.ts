import type { Config } from 'tailwindcss'

const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      fontSize: {
        xs: '0.625rem', // 10px
        sm: '0.75rem', // 12px
        base: '0.8125rem', // 13px
        lg: '0.875rem', // 14px
        xl: '1rem', // 16px
        '2xl': '1.125rem' // 18px
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
export default config
