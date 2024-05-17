/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'autoland-storage.s3.eu-central-1.amazonaws.com',
                port: '',
                pathname: '/*',
            },
        ],
    },
    env: {
        SECRET_KEY: process.env.SECRET_KEY,
        AWS_S3_NAME: process.env.AWS_S3_BUCKET_NAME,
        AWS_S3_REGION_S: process.env.AWS_S3_REGION
    }
};

export default nextConfig;
