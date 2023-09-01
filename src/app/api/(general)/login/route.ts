import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();
  console.log('res', res);
  const userId = res.userId;
  const password = res.password;
  const response = await fetch(
    `http://localhost:8080/qa_system_api/users/${userId}?password=${password}`
  );
  const data = await response.json();
  console.log('data', data);
  return NextResponse.json(data);
}
