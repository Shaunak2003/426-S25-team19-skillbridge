import express from 'express';
import authRoutes from './route';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    console.log(`[AUTH] ${req.method} ${req.originalUrl}`);
    next();
  })

app.listen(5001, () => {
  console.log('Auth service running on port 5001');
});
