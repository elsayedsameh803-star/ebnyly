export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  if (!supabase) {
    supabase = createClient(url, anonKey);
  }

  return supabase;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Please provide a website idea" }, { status: 400 });
    }

    // 1. Call Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional web developer. Build a complete HTML + Tailwind CSS + JS website in a single file.
              Idea: ${prompt}
              Rules:
              - Elegant site with gold #d4af37 and dark blue #0a192f colors
              - RTL Arabic
              - Responsive
              - Return only complete HTML code, no explanation
              - Start with <!DOCTYPE html>`
            }]
          }]
        })
      }
    );

    const data = await res.json();
    let code = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    code = code.replace(/```html/g, "").replace(/```/g, "").trim();

    if (!code) throw new Error("Gemini failed");

    // 2. Persist to Supabase — this powers the real dashboard
    const db = getSupabase();

    if (db) {
      const { error } = await db.from('sites').insert({
        name: prompt.slice(0, 40),
        prompt: prompt,
        code: code,
        status: 'active'
      });

      if (error) console.log("Supabase error:", error);
    } else {
      console.warn("Supabase env vars missing — skipping site persistence");
    }

    // 3. Return code to the frontend
    return NextResponse.json({ code });

  } catch (e: unknown) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Build error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
