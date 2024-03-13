/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'https://api-booking-105b.onrender.com'],
  },
  env: {
    API_URL: 'https://api-booking-105b.onrender.com',
    FRONT_URL: 'https://app-booking-rho.vercel.app',
    // API_URL: 'http://localhost:8080',
    // FRONT_URL: 'http://localhost:3000',
    SECRET: 'secret_key'
  }
};

export default nextConfig;
