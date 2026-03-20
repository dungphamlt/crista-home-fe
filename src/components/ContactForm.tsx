"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: gắn API gửi form (email / CRM)
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
        Bạn cần tư vấn
      </h2>
      <p className="mt-3 text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
        Nếu bạn có bất kỳ câu hỏi nào về sản phẩm hoặc đơn hàng, hãy liên hệ với chúng tôi —
        đội ngũ Crista Home &amp; TEWA sẽ hỗ trợ bạn sớm nhất.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 md:space-y-5">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Họ và tên
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Họ và tên"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/15 dark:focus:ring-white/20 focus:border-slate-900 dark:focus:border-gray-400 transition"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/15 dark:focus:ring-white/20 focus:border-slate-900 dark:focus:border-gray-400 transition"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="sr-only">
            Số điện thoại
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="Số điện thoại"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/15 dark:focus:ring-white/20 focus:border-slate-900 dark:focus:border-gray-400 transition"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="sr-only">
            Nội dung
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Nội dung"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/15 dark:focus:ring-white/20 focus:border-slate-900 dark:focus:border-gray-400 transition resize-y min-h-[140px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition shadow-sm"
          >
            {status === "sending" ? "Đang gửi…" : "Gửi tin nhắn"}
          </button>
          {status === "sent" && (
            <span className="text-sm text-green-600 dark:text-green-400">
              Đã ghi nhận — chúng tôi sẽ liên hệ lại sớm.
            </span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-600">Gửi thất bại, vui lòng thử lại.</span>
          )}
        </div>
      </form>
    </div>
  );
}
