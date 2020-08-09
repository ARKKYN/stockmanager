export default {
  poweredByHeader: false,
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    }
    return config
  }
};
