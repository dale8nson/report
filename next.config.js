const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx','jsx','js','ts','tsx','pem']
}

module.exports = withMDX(nextConfig);