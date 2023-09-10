/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => ([
    {
      source: '/',
      destination: '/poker',
      permanent: false,
    }
  ])
}

module.exports = nextConfig
