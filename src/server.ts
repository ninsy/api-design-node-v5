import express from "express";
import path from "path";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { db } from './db/index.ts';
import { __dirname } from './utilts.ts';
import { v1Router } from './routes/v1/index.ts';
import { errValidation } from './middlewares/index.ts';
import { isDev, env, isTest } from "../env.ts";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev', {
    skip: isTest
}));

app.use('/api/v1', v1Router)

if (isDev() || env.DEBUG_MODE) {
    app.get('/debug', (req, res) => {
        res.json(process.env)
    })
}

app.get('/healthcheck', async (req, res)  => {
    await db.execute('SELECT 1;')
    res.status(200).json({
        timestamp: new Date().toISOString(),
        status: 'OK',
        service: 'Habit Tracker API',
    });
})

// catches all under '/', without root
// app.use('/*rest', async(req, res) => {
//     res.sendFile(path.resolve(__dirname, '../public/index.html'))
// });

app.use(errValidation);
app.use(async(req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

export default app
export { app }