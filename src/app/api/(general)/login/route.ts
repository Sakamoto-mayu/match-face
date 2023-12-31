import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();
  const userId = res.userId;
  const password = res.password;
  try {
    const response = await fetch(
      `${process.env.BE_URL}/users/${userId}?password=${password}`
    );
    const data = await response.json();
    cookies().delete('administratorId');
    if (data.user.id && data.user.length !== 0) {
      cookies().set({
        name: 'userId',
        value: `${data.user.id}`,
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24,
      });
    }
    return NextResponse.json(data);
  } catch (error) {
    throw new Error('api error');
  }
}
