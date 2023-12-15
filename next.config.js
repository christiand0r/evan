/** @type {import('next').NextConfig} */
//const nextConfig = {}

//module.exports = nextConfig

const CMS_URL = process.env.CMS;
const CURRENT_URL = process.env.HOST;

const nextConfig = {
    productionBrowserSourceMaps: true,
    images: {
        domains: [CMS_URL, CURRENT_URL],
    },
    optimization: {
        minimize: true, // Habilitar la minificación de código
    },
    reactStrictMode: false,
};

module.exports = nextConfig;