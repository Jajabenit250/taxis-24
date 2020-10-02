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
app.get('/home', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to Soma!' }));
app.use((req, res) => res.status(404).send({
  status: 404,
  error: 'route Not Found!',
}));

config(); 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Soma Africa APP', `Server is running on http://localhost:${port}`));
export default app;