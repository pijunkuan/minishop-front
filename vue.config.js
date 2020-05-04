const defaultSettings = require('./src/settings.js')

const path = require('path')
const webname = defaultSettings.title || "minishop-default"

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
	configureWebpack: {
    name:webname,
    resolve: {
     		alias: {
       		'@': resolve('src')
     		}
    }
  },
  productionSourceMap: false,
  publicPath:'/'
}