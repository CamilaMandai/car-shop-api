import express from 'express';
import routes from './Routes/Routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('olá'));
app.use(routes);

export default app;
