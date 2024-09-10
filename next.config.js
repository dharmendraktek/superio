/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PORT: process.env.PORT,                // Server port
        APP_ENV: process.env.APP_ENV,          // Application environment (test, production, etc.)
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,          // API URL
        CLIENT_URL: process.env.CLIENT_URL,    // Client URL
      },
}

module.exports = nextConfig
