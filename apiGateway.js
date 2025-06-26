require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

// Logging
console.log("✅ User Service Port:", process.env.USER_PORT);
console.log("✅ Admin Service Port:", process.env.ADMIN_PORT);

// Proxy /user → User Service
app.use('/user', createProxyMiddleware({
  target: `http://localhost:${process.env.USER_PORT}`,
  changeOrigin: true
}));

// Proxy /admin → Admin Service
app.use('/admin', createProxyMiddleware({
  target: `http://localhost:${process.env.ADMIN_PORT}`,
  changeOrigin: true
}));

app.listen(process.env.API_GATEWAY_PORT, () => {
  console.log(`🚀 API Gateway running on port ${process.env.API_GATEWAY_PORT}`);
});
