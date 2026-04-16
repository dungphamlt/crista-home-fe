"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      // TODO: Integrate with newsletter API
      await new Promise((r) => setTimeout(r, 500));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="px-4 py-2.5 text-sm md:text-base rounded-l-full bg-white text-gray-900 placeholder-gray-500 min-w-0 flex-1 md:w-56 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-5 py-2.5 text-sm md:text-base rounded-r-full border-2 cursor-pointer border-white text-white font-medium hover:bg-white/10 transition-colors disabled:opacity-70"
      >
        {status === "loading" ? "Đang gửi..." : "Gửi tin nhắn"}
      </button>
    </form>
  );
}
