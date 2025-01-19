import express from 'express';
import serverlessHttp from 'serverless-http';
import dotenv from 'dotenv';
import { router } from './routes/routes';
import cors from 'cors';

export const app = express();
const PORT = process.env.PORT || 3332;
app.use(cors());

dotenv.config();
router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});
app.use(express.json());
app.use('/.netlify/functions/api', router);

export const handler = serverlessHttp(app);
