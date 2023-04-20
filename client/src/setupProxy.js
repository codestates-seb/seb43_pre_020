const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/questions',
    createProxyMiddleware({
      target: 'https://7b40-49-171-175-238.ngrok-free.app',
      changeOrigin: true,
    })
  )
}
