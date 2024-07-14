/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_NAME: process.env.DATABASE_NAME,
        REGION: process.env.REGION,
        ACCESS_KEY: process.env.ACCESS_KEY,
        SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY
    }
}

export default nextConfig
