
const serverUrl = process.env.SERVER || 'http://127.0.0.1:8001'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  experimental: {
    appDir: true,
  },
  distDir: 'build',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  async rewrites () { 
    return [
      {
        source: '/server/:path*',
        destination: serverUrl + '/server/:path*',
      },
    ]
  },
}

module.exports = nextConfig
 
