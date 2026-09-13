import { NextResponse } from "next/server";

// Mock user API - returns current user with credits
export async function GET() {
  return NextResponse.json({
    credits: 1000,
  });
}
