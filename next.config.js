/**   {} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns:[
      {
        protocol : "https",
        hostname : "**"
      }
    ],
    domains: ['gravatar.com'], // Add 'gravatar.com' to the list of allowed domains
  }
};
