/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['multi-range-slider-react'],
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['res.cloudinary.com', 'www.visitmorocco.com', 'example.com', 'images.unsplash.com', 'via.placeholder.com', 'png.pngtree.com', 'rimage.gnst.jp'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

module.exports = nextConfig;
