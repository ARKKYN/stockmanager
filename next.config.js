export default {
  
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    }
    return config
  }
};
