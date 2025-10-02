/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/storage/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/storage/:path*',
                destination: 'http://127.0.0.1:8000/storage/:path*',
            },
        ]
    },
}

module.exports = nextConfig
