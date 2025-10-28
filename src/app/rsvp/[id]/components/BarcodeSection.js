// components/BarcodeSection.jsx
"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import imgTreeShadow from "../../../../images/img-tree-shadow-01.png";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, CircleCheck, CircleX, X } from "lucide-react";

export default function BarcodeSection({ barcode, invitationId, rsvpStatus }) {
  const RsvpStatus = {
    PENDING: "PENDING",
    ATTENDING: "ATTENDING",
    NOT_ATTENDING: "NOT_ATTENDING",
  };

  // Tentukan nilai awal berdasarkan rsvpStatus
  const initialStatus =
    rsvpStatus === RsvpStatus.ATTENDING
      ? "hadir"
      : rsvpStatus === RsvpStatus.NOT_ATTENDING
      ? "tidak"
      : null;

  const initialSubmitted =
    rsvpStatus === RsvpStatus.PENDING || !rsvpStatus ? false : true;

  const [status, setStatus] = useState(initialStatus); // "hadir" | "tidak" | null
  const [submitted, setSubmitted] = useState(initialSubmitted);

  const handleSubmit = async () => {
    if (!status) return;

    // Ubah status lokal ("hadir"/"tidak") ke format enum untuk API
    const mappedStatus =
      status === "hadir" ? RsvpStatus.ATTENDING : RsvpStatus.NOT_ATTENDING;

    try {
      await fetch(`/api/invitations/${invitationId}/rsvp`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: mappedStatus }),
      });

      // Setelah berhasil dikirim, ubah state submitted dan status agar konsisten
      setSubmitted(true);
      setStatus(status === "hadir" ? "hadir" : "tidak");
    } catch (error) {
      console.error("Gagal mengirim konfirmasi:", error);
    }
  };

  return (
    <section className="relative flex w-full flex-col justify-center items-center bg-[#EAEAEA] py-20 px-6 text-[#5E5E5E] gap-y-6">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-no-repeat bg-top-right"
        style={{
          backgroundImage: `url(${imgTreeShadow.src})`,
          backgroundSize: "420px auto",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />

      {/* Judul */}
      <div className="flex flex-col gap-y-2">
        <h2 className="relative font-analogue text-4xl italic font-bold tracking-wide text-center">
          Kehadiran Anda
        </h2>
        <p className="max-w-2xl text-center text-sm font-poppins leading-relaxed">
          Kehadiran Anda adalah kebahagiaan bagi kami.
        </p>
      </div>

      {/* Isi konten */}
      <AnimatePresence mode="wait">
        {!submitted && (
          <>
            {/* Card tutorial */}
            <motion.div
              key="tutorial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative max-w-lg text-left rounded-md bg-white p-6"
            >
            <ol className="list-decimal list-inside text-sm font-poppins leading-relaxed space-y-1">
              <li>
                Pilih tombol <span className="font-semibold">Hadir</span> atau{" "}
                <span className="font-semibold">Tidak Hadir</span>.
              </li>
              <li>
                Tekan tombol <span className="font-semibold">Kirim</span> untuk
                mengonfirmasi pilihan Anda.
              </li>
              <li>
                Jika memilih <span className="font-semibold">Hadir</span>, barcode
                khusus akan muncul sebagai tanda masuk acara.
              </li>
              <li>
                Tunjukkan barcode tersebut kepada panitia saat kedatangan.
              </li>
              <li>
                Barcode ini juga akan digunakan untuk{" "}
                <span className="font-semibold">penukaran suvenir</span> dan{" "}
                <span className="font-semibold">akan discan oleh panitia</span> sebagai
                tanda kehadiran Anda telah tercatat.
              </li>
            </ol>

            </motion.div>
            <div className="max-w-lg bg-white rounded-md p-6 space-y-2 flex flex-col items-center text-center gap-2 font-semibold text-[#444444]">
              <AlertCircle className="w-12 h-12" />
              <span>Perhatian: Jawaban yang Anda pilih tidak dapat diubah setelah dikirim.</span>
            </div>

            {/* Tombol Pilihan */}
            <div className="flex flex-col justify-center gap-4 w-full text-white max-w-lg">
              <div className="flex items-center w-full max-w-lg gap-4">
                <span className="flex-1 h-px bg-[#B0B0B0]" />
                <p className="text-sm font-semibold tracking-wide uppercase text-[#5E5E5E]">
                  Konfirmasi Kehadiran
                </p>
                <span className="flex-1 h-px bg-[#B0B0B0]" />
              </div>
              <div className="flex w-full gap-x-2">
                <button
                  onClick={() => setStatus("hadir")}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-2 text-sm tracking-wide transition-colors rounded 
                    ${status === "hadir"
                      ? "bg-[#5E5E5E] text-white"
                      : "bg-[#D6D6D6] text-[#444444]"}`}
                >
                  <CircleCheck size={16} /> Hadir
                </button>
                <button
                  onClick={() => setStatus("tidak")}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-2 text-sm tracking-wide transition-colors rounded 
                    ${status === "tidak"
                      ? "bg-[#5E5E5E] text-white"
                      : "bg-[#D6D6D6] text-[#444444]"}`}
                >
                  <CircleX size={16} /> Tidak Hadir
                </button>
              </div>

              {/* Tombol Kirim */}
              <button
                onClick={handleSubmit}
                disabled={!status}
                className={`w-full py-2 text-sm font-semibold tracking-wide rounded transition-colors 
                  ${status
                    ? "bg-[#5E5E5E] text-white"
                    : "bg-[#5E5E5E80] text-white cursor-not-allowed"}`}
              >
                Kirim
              </button>
            </div>
          </>
        )}

        {/* Setelah Submit */}
        {submitted && status === "hadir" && (
          <motion.div
            key="barcode"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white p-6 rounded-xl"
          >
            {barcode ? (
              <QRCodeCanvas
                value={barcode}
                size={240}
                bgColor="#ffffff"
                fgColor="#333333"
                level="H"
                marginSize={2}
              />
            ) : (
              <p className="text-gray-400">Barcode tidak tersedia</p>
            )}
          </motion.div>
        )}

        {submitted && status === "tidak" && (
          <motion.div
            key="tidak"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-md text-center bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-sm"
          >
            <p className="text-sm font-poppins leading-relaxed">
              Terima kasih sudah memberikan konfirmasi. <br />
              Semoga doa dan restu Anda selalu menyertai.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
