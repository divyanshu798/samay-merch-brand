/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com', 'sharkshirts.in', 'encrypted-tbn0.gstatic.com'],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/samay-merch-brand' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/samay-merch-brand/' : '',
}

module.exports = nextConfig