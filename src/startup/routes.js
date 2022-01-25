import cors from 'cors';
import express from 'express';
const router = express.Router();
const app = express();

import imgRouter from '../routes/img.js';

app.use(cors());
app.use('/', imgRouter);
app.use('/.netlify/functions/server', router); 

export default app;