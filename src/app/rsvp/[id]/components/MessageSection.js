"use client";

import { useState, useEffect } from "react";

export default function MessageSection({ invitationId }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  // Ambil seluruh ucapan berdasarkan invitationId
  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments");
      if (!res.ok) throw new Error("Gagal memuat ucapan");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    if (invitationId) fetchComments();
  }, [invitationId]);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setIsSending(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, invitationId }),
      });

      if (!res.ok) throw new Error("Gagal mengirim ucapan");

      setMessage("");
      setSent(true);
      fetchComments(); // refresh daftar ucapan setelah kirim
      setTimeout(() => setSent(false), 2000);
    } catch (err) {
      console.error("Error:", err);
      setError("Terjadi kesalahan saat mengirim ucapan.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center bg-[#ffffffdd] py-14 text-[rgb(94,94,94)] gap-y-8">
      {/* Header */}
      <div className="flex flex-col gap-y-2">
        <h2 className="relative font-analogue text-4xl italic font-bold tracking-wide text-center">
          Ucapan <span className="font-poppins font-normal">&</span> Doa
        </h2>
        <p className="max-w-2xl text-center text-sm font-poppins leading-relaxed">
          Berikan doa dan ucapan terbaik untuk kami.
        </p>
      </div>

      {/* Form Ucapan */}
      <div className="flex flex-col justify-center gap-4 w-full text-[#5E5E5E] max-w-lg px-8">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan terbaikmu di sini..."
          className="w-full bg-white min-h-[120px] p-3 rounded-xs border border-[#B0B0B0] text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-[#5E5E5E50] resize-none"
        />

        {/* Divider */}
        <div className="flex items-center w-full max-w-lg gap-4">
          <span className="flex-1 h-px bg-[#B0B0B0]" />
          <p className="text-sm font-semibold tracking-wide uppercase text-[#5E5E5E]">
            Kirim Ucapan
          </p>
          <span className="flex-1 h-px bg-[#B0B0B0]" />
        </div>

        {/* Tombol Kirim */}
        <button
          onClick={handleSubmit}
          disabled={isSending || !message.trim()}
          className={`w-full py-2 text-sm font-semibold tracking-wide transition-colors
            ${
              isSending || !message.trim()
                ? "bg-[#5E5E5E80] text-white cursor-not-allowed"
                : "bg-[#5E5E5E] text-white hover:bg-[#444444]"
            }`}
        >
          {isSending ? "Mengirim..." : sent ? "Terkirim!" : "Kirim"}
        </button>

        {/* Pesan Sukses / Error */}
        {sent && (
          <p className="text-center text-sm text-green-600 font-medium">
            Ucapanmu telah terkirim
          </p>
        )}
        {error && (
          <p className="text-center text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>

      {/* Daftar Ucapan */}
      <div className="w-full max-w-lg px-8 font-poppins text-sm">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-gray-500 italic py-10">
            Belum ada ucapan, jadilah yang pertama~
          </p>
        ) : (
          <div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#b0b0b0] scrollbar-track-transparent">
            {comments.map((item) => (
              <div
                key={item.id}
                className="p-4 border-b border-[#B0B0B0] gap-y-1 flex flex-col"
              >
                <p className="font-semibold text-gray-700">
                  {item.invitation?.guestName || "Tamu Undangan"}
                </p>
                <p className="text-gray-600 leading-relaxed">{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
