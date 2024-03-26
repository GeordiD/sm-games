/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => ([
    {
      source: '/',
      destination: '/poker',
      permanent: false,
    }
  ]),
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

module.exports = nextConfig
