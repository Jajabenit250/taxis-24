import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import Route from './routes/index';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', Route);
app.use((req, res) => res.status(200).send({
  status: 200,
  error: 'Welcome to taxi 24',
}));

config(); 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('taxis 24 api', `Server is running on http://localhost:${port}`));
export default app;