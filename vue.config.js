module.exports = {
  publicPath:'/auto-appstore/fuel-path',
  // publicPath:'./',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:55001/',
        // target: 'http://10.10.10.4:55001/',
        changeOrigin: true,
        pathRewrite: {
          ['^api']: '/api'
        }
      }
    }
  }
}