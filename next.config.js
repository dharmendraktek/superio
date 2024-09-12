/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PORT: process.env.PORT,
        APP_ENV: process.env.APP_ENV,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        CLIENT_URL: process.env.CLIENT_URL,
    },

    // Set the basePath to match your deployment subfolder
    basePath: '/superio',

    // Optional: Serve static assets from the custom path
    assetPrefix: '/superio/',  // This ensures that assets are prefixed with /superio

    trailingSlash: true,

    webpack: (config, { isServer }) => {
        return config;
    },
}

module.exports = nextConfig;
