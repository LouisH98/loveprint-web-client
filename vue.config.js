module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath:  process.env.NODE_ENV === 'production' ? '/loveprint-web-client/' : '/',

  pwa: {
    name: 'LovePrint',
    themeColor: '#FF0000',
    workboxOptions: {
      skipWaiting: true
    }
  }
}