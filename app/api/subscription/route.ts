import { NextResponse } from "next/server";

// Mock subscription API - POST { amount } adds credits = amount * 10
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body?.amount) || 0;

    if (amount <= 0) {
      return NextResponse.json(
        { error: "amount must be a positive number" },
        { status: 400 }
      );
    }

    const creditsAdded = amount * 10;

    return NextResponse.json({
      creditsAdded,
      message: `تم إضافة ${creditsAdded} كريدت لحسابك`,
    });
  } catch {
    return NextResponse.json(
      { error: "invalid request body" },
      { status: 400 }
    );
  }
}
