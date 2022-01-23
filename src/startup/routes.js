import express from 'express';
import cors from 'cors';

import imgRouter from '../routes/img.js';

export default function startup(app) {
    app.use(cors());
    app.use('/', imgRouter);
};