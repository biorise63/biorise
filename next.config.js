/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Генерирует статические HTML файлы
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
