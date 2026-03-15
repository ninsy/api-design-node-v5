import { Pool } from 'pg';
import { drizzle, type NodePgClient } from 'drizzle-orm/node-postgres';
import { remember } from '@epic-web/remember';

import { getConnectionString } from './utils.ts';
import { isProd } from '../../env.ts';
import * as schema from './schema.ts';

const createPool = () => {
    return new Pool({
        connectionString: getConnectionString(),
    });
}

let client: NodePgClient

if (isProd()) {
    client = createPool();
} else {
    // TODO: no longer needed? verify
    client = remember('dbClient', () => createPool());
}

export const db = drizzle({ client, schema });
export default db;

