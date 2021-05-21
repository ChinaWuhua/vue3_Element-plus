module.exports = {
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    port: 8080,
    https: false,
    proxy: {//配置跨域
      '/api': {
        target: 'http://45.32.111.201:7999',
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': '' 
        }
      }
    }
  }
}