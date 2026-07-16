const path = require('path');

module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      url: require.resolve("url/"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      vm: require.resolve("vm-browserify"),
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  };