import { NextResponse } from 'next/server';

export function NoUserIdFound() {
  return NextResponse.json(
    { message: 'Auth failed. Please login again' },
    { status: 401 },
  )
}