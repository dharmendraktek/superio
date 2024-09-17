/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PORT: process.env.PORT,
        APP_ENV: process.env.APP_ENV,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        CLIENT_URL: process.env.CLIENT_URL,
    },

    webpack: (config, { isServer }) => {
        return config;
    },
}

module.exports = nextConfig;
