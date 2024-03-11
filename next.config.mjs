/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos', 'localhost'],
  },
  env: {
    API_URL: 'http://localhost:8080',
    FRONT_URL: 'http://localhost:3000',
    SECRET: 'secret_key'
  }
};

export default nextConfig;
