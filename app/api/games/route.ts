import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from 'next/server';

// Dead?
export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  return NextResponse.json({ success: true, token });
}
