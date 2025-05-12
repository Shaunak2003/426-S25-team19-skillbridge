import express from 'express';
import userRoutes from './route';

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);

app.listen(5002, () => {
  console.log('User service running on port 5002');
});
