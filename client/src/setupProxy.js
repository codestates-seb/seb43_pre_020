const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/members', {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/questions', {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/auth', {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/profile', {
      target: process.env.REACT_APP_NGROK_URL,
      changeOrigin: true,
    })
  )
}
