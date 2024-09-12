/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PORT: process.env.PORT,                // Server port
        APP_ENV: process.env.APP_ENV,          // Application environment (test, production, etc.)
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,          // API URL
        CLIENT_URL: process.env.CLIENT_URL,    // Client URL
      },
    path: {
    basePath: "https://katalixai.com",
    assetPrefix: "https://katalixai.com",
  },
     basePath: '/superio',  // Assuming your app is located under `/superio`

    // Serve static assets (CSS, JS) from a custom path
    assetPrefix: '/superio/.next/',

    // Optional: Enforce trailing slashes for URLs and assets
    trailingSlash: true,
}

module.exports = nextConfig
