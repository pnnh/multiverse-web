
const serverUrl = process.env.SERVER || 'http://127.0.0.1:8001'
const resourceServerUrl = process.env.RESOURCE_SERVER || 'http://127.0.0.1:8002'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: '/.well-known/:path*',
        destination: serverUrl + '/.well-known/:path*',
      },
      {
        source: '/resource/:path*',
        destination: resourceServerUrl + '/resource/:path*',
      },
    ]
  },
}

module.exports = nextConfig
 
