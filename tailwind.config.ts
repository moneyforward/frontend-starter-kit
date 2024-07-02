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
      colors: {
        'ct-blue': '#0c66e4',
        'ct-light-blue': '#E6EFFC',
        'ct-black': '#303030',
        // 'ct-blue': '#3b7de9',
        'ct-blue-gray': '#32373f',
        'ct-dark-gray': '#7c8291',
        'ct-dark-gray-2': '#42474f',
        'ct-dark-gray-3': '#666666',
        'ct-sonic-silver': '#777777',
        'ct-dark-purple': '#9cabd4',
        'ct-quicksilver': '#999999',
        'ct-gray': '#d4d8dd',
        'ct-suva-grey': '#919191',
        'ct-gainsboro': '#d9d9d9',
        'ct-light-gray': '#e2e2e2',
        'ct-light-gray-2': '#f6f6f6',
        'ct-light-gray-3': '#f5f5f5',
        'ct-light-gray-4': '#c6c6c6',
        // 'ct-light-blue': '#cbe6ff',
        'ct-light-blue-2': '#ebf1fb',
        'ct-light-purple': '#c2d1fc',
        'ct-orange': '#e29e00',
        'ct-red': '#ec4949',
        'ct-white': '#ffffff',
        'ct-white-smoke': '#f1f1f1',
        'ct-peach': '#ffedea',
        'ct-pinkish-red': '#bc1227'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
export default config
