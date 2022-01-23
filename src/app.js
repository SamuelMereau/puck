import express from 'express';
import startup from './startup/routes.js';
const app = express();

startup(app);

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Server is listening on port ${port}`) });