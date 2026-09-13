import { NextResponse } from "next/server";

// Mock publish API - accepts site payload and returns a fake public URL
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid site payload" }, { status: 400 });
  }

  const slug = `site-${Math.random().toString(36).slice(2, 8)}`;

  return NextResponse.json({
    url: `https://ebnyly.app/s/${slug}`,
    slug,
    publishedAt: new Date().toISOString(),
  });
}