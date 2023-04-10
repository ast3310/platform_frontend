const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.svg$/,
        use: ['vue-loader', path.resolve(__dirname, 'scripts/svg-to-vue.js')],
      }]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .test(() => false)
      .use('file-loader')

    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Партнер'
        return args
      })
  }
})
