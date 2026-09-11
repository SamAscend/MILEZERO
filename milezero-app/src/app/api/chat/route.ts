import { NextResponse } from "next/server";
import { achievements, activities, members, timeline } from "@/data/milezero";

const archiveContext = JSON.stringify({ members, activities, achievements, timeline });

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are the MILEZERO Archive Assistant. Answer in the same language as the user, with a calm, concise editorial tone. Only state facts supported by the archive context below. If the answer is not in the context, say you do not have that record yet. Do not invent members, runs, dates, or statistics. Archive context: ${archiveContext}`,
          },
          ...messages.slice(-10).map((message: { role: string; content: string }) => ({
            role: message.role === "assistant" ? "assistant" : "user",
            content: message.content,
          })),
        ],
        max_tokens: 220,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: "The archive assistant could not respond right now." }, { status: response.status });
    }

    return NextResponse.json({ text: data.choices?.[0]?.message?.content ?? "I could not find that in the archive yet." });
  } catch {
    return NextResponse.json({ error: "The archive assistant could not respond right now." }, { status: 500 });
  }
}
