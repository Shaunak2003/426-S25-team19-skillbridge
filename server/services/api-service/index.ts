import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
  }));

app.use('/api/auth', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: (path: any, req: any) => {
    const newPath = `/api/auth${req.url}`;
    console.log(`[REWRITE] Forwarding ${req.method} ${path} → ${newPath}`);
    return newPath;
  }
}));

app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true,
  pathRewrite: (path: any, req: any) => `/api/user${req.url}`
}));


app.use('/api/messages', createProxyMiddleware({
  target: 'http://localhost:5003',
  changeOrigin: true,
  pathRewrite: (path: any, req: any) => `/api/message${req.url}`
}));

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
