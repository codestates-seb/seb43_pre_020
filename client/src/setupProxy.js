const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/members',
    createProxyMiddleware({
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  )
}
