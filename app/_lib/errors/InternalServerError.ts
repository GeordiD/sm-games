import { NextResponse } from 'next/server';

export function InternalServerError() {
  return NextResponse.json(
    { message: 'Internal Server Error;' },
    { status: 500 },
  );
}