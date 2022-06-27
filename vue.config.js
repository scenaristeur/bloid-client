const publicPath = process.env.NODE_ENV === 'production' ? '/bloid-client/' : '/'
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: publicPath,
  transpileDependencies: true
})
