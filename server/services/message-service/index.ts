import express from 'express';
import messageRoutes from './route';

const app = express();
app.use(express.json());

app.use('/api/message', messageRoutes);

app.listen(5003, () => {
  console.log('Message service running on port 5003');
});
