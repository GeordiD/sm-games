import { NextResponse } from 'next/server';

export function NotFound() {
  return NextResponse.json({
    message: 'Not found.'
  }, { status: 404})
}