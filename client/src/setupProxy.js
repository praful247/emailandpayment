import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:5000', // <- No /api here
  changeOrigin: true,
});

app.use('/api', proxyMiddleware);

