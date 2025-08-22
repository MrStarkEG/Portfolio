/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/shahat_readme' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/shahat_readme' : '',
  trailingSlash: true,
}

module.exports = nextConfig