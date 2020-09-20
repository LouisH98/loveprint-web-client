module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack:{
    module: {
      rules: [
        {
          test: /\.md$/i,
          use: [
            {
              loader: 'raw-loader',
              options: {
                esModule: false,
              },
            }
          ]
        }]
    }
  },


  publicPath:  process.env.NODE_ENV === 'production' ? '/loveprint-web-client/' : '/',

  pwa: {
    name: 'LovePrint',
    themeColor: '#FF0000',
    appleMobileWebAppCapable:'yes',
    assetsVersion: '0.2.0',
    workboxOptions: {
      skipWaiting: true
    }
  }
}