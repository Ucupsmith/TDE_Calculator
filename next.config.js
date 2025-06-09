/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ]
    });
    return config;
  },
  images: {
    domains: [
      'localhost',
      'slashdot.org',
      'consent.google.com',
      'markets.businessinsider.com',
      'www.businessinsider.com',
      'coinpaper.com',
      'www.erlang.org',
      'cdn.vox-cdn.com',
      'a.fsdn.com',
      'i.insider.com',
      'res.cloudinary.com',
      'pict.sindonews.net',
      'images.unsplash.com',
      'seeds-bucket-new.s3.ap-southeast-3.amazonaws.com',
      'via.placeholder.com'
    ]
  }
};

module.exports = nextConfig;
