import { NextResponse } from "next/server";
import { achievements, activities, members, timeline } from "@/data/milezero";

const archiveContext = JSON.stringify({ members, activities, achievements, timeline });

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        instructions: `You are the MILEZERO Archive Assistant. Answer in the same language as the user, with a calm, concise editorial tone. Only state facts supported by the archive context below. If the answer is not in the context, say you do not have that record yet. Do not invent members, runs, dates, or statistics. Archive context: ${archiveContext}`,
        input: messages.slice(-10).map((message: { role: string; content: string }) => ({
          role: message.role === "assistant" ? "assistant" : "user",
          content: message.content,
        })),
        max_output_tokens: 220,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: "The archive assistant could not respond right now." }, { status: response.status });
    }

    return NextResponse.json({ text: data.output_text ?? "I could not find that in the archive yet." });
  } catch {
    return NextResponse.json({ error: "The archive assistant could not respond right now." }, { status: 500 });
  }
}
