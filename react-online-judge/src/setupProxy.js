const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/jdoodle', {
      target: 'https://api.jdoodle.com/v1/execute',
      pathRewrite: {
        '^/jdoodle':''
      },
	  changeOrigin: true,
    })
  );
};