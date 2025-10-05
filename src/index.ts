import { app } from './server.ts';
import { env } from '../env.ts';

app.listen(env.PORT, () => {
    console.log(`running all good on port: ${env.PORT}`);
})
