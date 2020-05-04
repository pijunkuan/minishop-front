const defaultSettings = require('./src/settings.js')

const path = require('path')
const webname = defaultSettings.title || "MiniShop"

const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css:{
    loaderOptions:{
      sass:{
        prependData:`
          @import "@/assets/style/mixin.scss";
          @import "@/assets/style/theme.scss";
        `
      }
    }
  },
	configureWebpack: (config) => {
    config.name = webname
    config.resolve.alias = {'@':resolve('src')}
    if(process.env.NODE_ENV === 'production'){
      config.mode = 'production'
      if(openGzip){
        config.plugins = [
          ...config.plugins,
          new CompressionPlugin({
            test:/\.js$|\.html$|.\css/,
            threshold:10240,
            deleteOriginalAssets:false
          })
        ]
      }
    }else{
      config.mode = 'development'
    }
  },
  productionSourceMap: false,
  publicPath:'/'
}