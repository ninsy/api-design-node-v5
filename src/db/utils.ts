import { env } from '../../env.ts';

type DBUser = typeof env.POSTGRES_USER;
type DBPassword = typeof env.POSTGRES_PASSWORD;
type DBHost = typeof env.POSTGRES_HOST;
type DBPort = typeof env.POSTGRES_PORT;
type DBName = typeof env.POSTGRES_DB;
type PostgreSQLConnectionString = `postgresql://${DBUser}:${DBPassword}@${DBHost}:${DBPort}/${DBName}`

export const getConnectionString = (): PostgreSQLConnectionString => {
    const { 
        POSTGRES_DB,
        POSTGRES_HOST,
        POSTGRES_PASSWORD,
        POSTGRES_PORT,
        POSTGRES_USER
    } = env;
    return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
}
