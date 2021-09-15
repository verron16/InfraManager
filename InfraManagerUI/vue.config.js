const path = require("path");

module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        "@ag-grid-community/core$": path.resolve(
          __dirname,
          "node_modules/@ag-grid-community/core"
        ),
        vue$: path.resolve(__dirname, "node_modules/vue/dist/vue.common.js"),
      },
    },
  },
  lintOnSave: false,
};
