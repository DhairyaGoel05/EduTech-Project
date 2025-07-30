import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Using the aliased path to our db lib

export async function POST(request: Request) {
  // 1. Authorize the request using the secret key from your .env.local
  const secret = request.headers.get('x-auth0-hook-secret');
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    console.warn('Unauthorized access attempt to sync-user endpoint.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Get the user data sent from the Auth0 Action
    const userData = await request.json();
    const { auth0_id, email, full_name, user_role } = userData;

    if (!auth0_id || !email || !user_role) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // 3. Define the database query to save or update the user
    const queryText = `
      INSERT INTO users (auth0_id, email, full_name, user_role, last_login_at)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (auth0_id)
      DO UPDATE SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        last_login_at = NOW()
      RETURNING *;
    `;

    const values = [auth0_id, email, full_name, user_role];
    
    // 4. Execute the query using your db.ts library
    const { rows } = await query(queryText, values);
    
    console.log(`User synced successfully: ${rows[0].email}`);
    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
