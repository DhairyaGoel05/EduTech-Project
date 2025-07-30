import { Pool, QueryResult } from 'pg';

// This creates a new connection pool to your PostgreSQL database.
// The credentials are automatically read from the .env.local file by Next.js.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// We export a query function to be used by our API routes.
// CORRECTED: By explicitly defining the return type as a Promise<QueryResult>,
// we resolve the TypeScript error and ensure type safety.
export const query = (text: string, params: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};
