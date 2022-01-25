import express from 'express';
import app from './src/startup/routes.js';

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Server is listening on port ${port}`) });