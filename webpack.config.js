/* eslint-disable no-unused-vars */
const path = require("path");

module.exports = {
  // ... other configurations
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },
};
