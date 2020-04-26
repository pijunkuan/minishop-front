const path = require('path')

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
    resolve: {
     		alias: {
       		'@': resolve('src')
     		}
    }
  },
  productionSourceMap: false,
  publicPath:'/'
}