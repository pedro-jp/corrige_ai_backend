import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import cors from 'cors';

export const app = express();
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3332;
app.use(express.json());
app.use(router);

app.route('/').get((req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
