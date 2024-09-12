/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PORT: process.env.PORT,                // Server port
        APP_ENV: process.env.APP_ENV,          // Application environment (test, production, etc.)
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,  // API URL
        CLIENT_URL: process.env.CLIENT_URL,    // Client URL
    },

    // Base path for the entire app
    basePath: '',  // Assuming your app is located under `/superio`

    // Serve static assets (CSS, JS) from a custom path
    assetPrefix: '',  // <-- Missing comma here

    // Optional: Enforce trailing slashes for URLs and assets
    trailingSlash: true,

    // Optional: Webpack configuration to handle custom behaviors
    webpack: (config, { isServer }) => {
        // Custom Webpack rules here, if needed
        return config;
    },
}

module.exports = nextConfig;
