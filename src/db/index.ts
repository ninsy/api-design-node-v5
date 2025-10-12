import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

import { getConnectionString } from './utils.ts';

const pool = new Pool({
    connectionString: getConnectionString(),
});

export const db = drizzle({ client: pool });
