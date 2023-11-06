/** @type {import('next').NextConfig} */
//const nextConfig = {}

//module.exports = nextConfig

const CMS_URL = process.env.CMS;

const nextConfig = {
    images: {
      domains: [CMS_URL],
    },
  };
  
  module.exports = nextConfig;