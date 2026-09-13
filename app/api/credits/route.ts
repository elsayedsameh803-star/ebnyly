import { NextResponse } from "next/server";

// Mock credits API
// GET  -> current credits balance
// POST -> consume credits (amount in body)
let credits = 1000;

export async function GET() {
  return NextResponse.json({ credits });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { amount?: number };
  const amount = Number(body.amount ?? 0);

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "amount must be a positive number" }, { status: 400 });
  }
  if (credits < amount) {
    return NextResponse.json({ error: "insufficient credits" }, { status: 402 });
  }

  credits -= amount;
  return NextResponse.json({ credits });
}