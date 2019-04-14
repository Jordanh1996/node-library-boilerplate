
const isProduction = /pro?d/gi.test(process.env.NODE_ENV);

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript"
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread"
    ],
    sourceMaps: isProduction ? false : "inline",
    retainLines: isProduction ? false : true,
    minified: isProduction ? true : false,
  };
};
