const webpack = require("webpack");

module.exports = {
  // ... محتوى إعدادات webpack الخاصة بك ...

  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
