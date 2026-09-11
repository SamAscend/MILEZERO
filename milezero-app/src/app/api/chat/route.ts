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
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `You are the MILEZERO Archive Assistant: a friendly guide to the MILEZERO running crew and practical running wellness. Answer in the same language as the user. Use a calm, concise, helpful tone.

For MILEZERO questions, only state facts supported by the archive context below. Never invent members, runs, dates, locations, achievements, or statistics. If a MILEZERO fact is not in the context, say that record is not in the archive yet.

For general questions related to running, training, recovery, stretching, mobility, sleep, hydration, nutrition, race preparation, injury prevention, and healthy habits, give practical beginner-friendly educational guidance. Clearly label general advice as general guidance, avoid diagnosing injuries or illnesses, and recommend a qualified doctor, physiotherapist, dietitian, or emergency service when symptoms are severe, sudden, persistent, or urgent. Do not prescribe medication or claim to replace professional care.

You can also help users think through a simple training plan, warm-up, cool-down, easy-run effort, fueling basics, and questions about how to start running. Ask a brief follow-up question when personal context such as age, experience, goal, distance, symptoms, or dietary restrictions is needed. Keep answers useful and not overly long.

Archive context: ${archiveContext}`,
          },
          ...messages.slice(-10).map((message: { role: string; content: string }) => ({
            role: message.role === "assistant" ? "assistant" : "user",
            content: message.content,
          })),
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const providerMessage = typeof data.error?.message === "string"
        ? data.error.message
        : "Groq rejected the request.";
      console.error("Groq API error", response.status, providerMessage);
      return NextResponse.json({ error: `Groq error (${response.status}): ${providerMessage}` }, { status: 502 });
    }

    return NextResponse.json({ text: data.choices?.[0]?.message?.content ?? "I could not find that in the archive yet." });
  } catch (error) {
    console.error("Chat route error", error);
    return NextResponse.json({ error: "The archive assistant could not respond right now." }, { status: 500 });
  }
}
