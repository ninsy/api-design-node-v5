import express from "express";
import path from "path";
import { __dirname } from './utilts.ts';

import { v1Router } from './routes/v1/index.ts';
import { errValidation } from './middlewares/index.ts';
import { isDev, env } from "../env.ts";

const app = express();

app.use(express.json())
app.use('/api/v1', v1Router)

if (isDev() || env.DEBUG_MODE) {
    app.get('/debug', (req, res) => {
        res.json(process.env)
    })
}

app.get('/healthcheck', async (req, res)  => {
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