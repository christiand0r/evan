/** @type {import('next').NextConfig} */
//const nextConfig = {}

//module.exports = nextConfig

const CMS_URL = process.env.CMS;
const CURRENT_URL = process.env.HOST;

const nextConfig = {
    images: {
      domains: [CMS_URL, CURRENT_URL],
    },
    /*api: {
        bodyParser: true, // Habilita el manejo de solicitudes POST en la carpeta 'api'
    },
    async rewrites() {
        return [
            // Ejemplo de reescritura para enviar todas las solicitudes '/api/sendEmail' a '/api/sendEmail.js'
            {
                source: '/api/:path*',
                destination: '/api/:path*.js',
            },
        ];
    },*/
};

module.exports = nextConfig;