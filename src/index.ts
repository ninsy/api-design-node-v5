import { app } from './server.ts';
import { env } from '../env.ts';
import { db } from './db/index.ts';

const server = app.listen(env.PORT, () => {
    console.log(`running all good on port: ${env.PORT}`);
})

const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  // 1. Stop accepting new HTTP requests
  server.close(async (err) => {
    if (err) {
      console.error('Error closing HTTP server:', err);
    } else {
      console.log('HTTP server closed. No longer accepting requests.');
    }

    try {
      // 2. Drain and close the database connection pool
      console.log('Closing database connection pool...');
      await db.$client.end
      console.log('Database connection pool cleanly closed.');
      
      // 3. Exit the process successfully
      process.exit(0);
    } catch (dbErr) {
      console.error('Error during database disconnection:', dbErr);
      process.exit(1);
    }
  });

  // Failsafe: Force a shutdown if it takes longer than 10 seconds
  setTimeout(() => {
    console.error('Graceful shutdown took too long. Forcing exit.');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
