module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      http: false, // Ignore the `http` module
    },
  };
  return config;
};
