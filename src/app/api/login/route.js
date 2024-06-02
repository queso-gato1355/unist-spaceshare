import { connectToDatabase } from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Username and password are required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { db } = await connectToDatabase();

  const user = await db.collection('users').findOne({ username });

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  return new Response(JSON.stringify({ success: true, token }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`,
    },
  });
}
