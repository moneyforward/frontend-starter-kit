/** @type {import('next').NextConfig} */

const path = require('path')

const sassConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/sass')]
  }
}

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            icon: true
          }
        }
      ]
    })

    return config
  },
  redirects: async () => {
    return [
      {
        source: '/user/auth/mfid/callback',
        destination: `/api/auth/mfid/callback`,
        permanent: true
      }
    ]
  },
  reactStrictMode: process.env.APP_ENV === 'development' ? false : true,
  output: 'standalone',
  experimental: {
    instrumentationHook: true
  },
  ...sassConfig
}

module.exports = nextConfig
