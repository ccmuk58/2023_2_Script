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
  app.use(
	createProxyMiddleware('/credit', {
	  target: 'https://api.jdoodle.com/v1/credit-spent',
	  pathRewrite: {
		'^/credit':''
	  },
	  changeOrigin: true,
	})
  );
};