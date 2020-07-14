

module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production',config => {
      config.entry('app')
      .clear()
      .add('./src/main-prod.js');

      config.set('externals',{
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        loadash: '_',
        echarts: 'echarts',
        'vue-quil-editor': 'VueQuilEditor'
      })
    });

    config.when(process.env.NODE_ENV === 'development',config => {config.entry('app').clear().add('./src/main-dev.js')
    });

  }
}