module.exports = {
  poweredByHeader: false,
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    }
    return config
  }
};
