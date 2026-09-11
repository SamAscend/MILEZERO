"use client";

import { useState } from "react";

type Message = { role: "assistant" | "user"; text: string };

const quickQuestions = ["Who are the first five?", "What was the latest run?", "Why Mile Zero?"];

export default function ArchiveAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Welcome to the MILEZERO archive. What do you want to remember?" },
  ]);

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    const nextMessages = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.map((message) => ({ role: message.role, content: message.text })) }),
      });
      const data = await response.json();
      setMessages((current) => [...current, { role: "assistant", text: data.text ?? data.error ?? "The archive assistant is unavailable." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: "The archive assistant is unavailable right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`archive-assistant ${isOpen ? "is-open" : ""}`}>
      {isOpen && (
        <section className="assistant-panel" aria-label="MILEZERO Archive Assistant">
          <div className="assistant-header">
            <div><span className="assistant-status" /> <strong>Archive Assistant</strong><small>Knowledge from MILEZERO</small></div>
            <button className="assistant-close" onClick={() => setIsOpen(false)} aria-label="Close assistant">×</button>
          </div>
          <div className="assistant-messages" aria-live="polite">
            {messages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}>{message.text}</div>)}
            {isLoading && <div className="assistant-message assistant">Thinking about the archive...</div>}
          </div>
          <div className="assistant-quick-actions">{quickQuestions.map((question) => <button key={question} onClick={() => sendMessage(question)}>{question}</button>)}</div>
          <form className="assistant-form" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask the archive..." aria-label="Ask the archive" /><button type="submit" aria-label="Send message">↗</button></form>
        </section>
      )}
      <button className="assistant-launcher" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close archive assistant" : "Open archive assistant"}><span className="assistant-mark">M</span><span>{isOpen ? "Close" : "Ask MILEZERO"}</span></button>
    </div>
  );
}
