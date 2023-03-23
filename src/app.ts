import express from 'express';
import routes from './Routes/Routes';

const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('olá'));
app.use(routes);

export default app;
