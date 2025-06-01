/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            ],
        });
        return config;
    },
    images: {
        domains: ['localhost'],
    },
}

module.exports = nextConfig; 