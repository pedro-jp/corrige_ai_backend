import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import cors from 'cors';

export const app = express();
const PORT = process.env.PORT || 3332;
app.use(cors());

dotenv.config();
router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
