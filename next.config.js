/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const env = {
  SPACE_ID: '5m2yfn34jan1',
  ACCESS_TOKEN: 'L-FeufxS7r7K0aly-ULPIrMxQuRu71NQ2qJkITqjO7M',
  SKIP_BUILD_STATIC_GENERATION:'true'
}

module.exports = { nextConfig, env }
