var ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
var path = require("path");

module.exports = {
  lintOnSave: undefined,
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, "src/sw.js")
      })
    ]
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_import.scss";`
      }
    }
  }
};
