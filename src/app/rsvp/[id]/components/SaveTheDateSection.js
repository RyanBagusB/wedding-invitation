// components/SaveTheDateSection.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

// import gambar statis (Next.js akan handle optimasi)
import img1 from "../../../../images/0-PEMBUKA.jpg";

export default function SaveTheDateSection({ countdown }) {
  const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan&dates=20251108T000000/20251108T235900&details=Undangan+Pernikahan&sf=true&output=xml`;

  const backgrounds = [img1, img1, img1];
  const [index, setIndex] = useState(0);

  // otomatis ganti background tiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center py-20 px-6 gap-14 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backgrounds[index].src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>
        {/* backdrop gelap */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Top Title */}
      <h2 className="font-analogue text-4xl">Save The Date</h2>

      {/* Countdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full">
        <div>
          <p className="text-4xl font-bold">{countdown.days}</p>
          <p className="text-xs uppercase tracking-wide">Hari</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{countdown.hours}</p>
          <p className="text-xs uppercase tracking-wide">Jam</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{countdown.minutes}</p>
          <p className="text-xs uppercase tracking-wide">Menit</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{countdown.seconds}</p>
          <p className="text-xs uppercase tracking-wide">Detik</p>
        </div>
      </div>

      <a
        href={calendarLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-[14px] font-poppins px-6 py-2 border border-white/40 bg-white/10 backdrop-blur-md cursor-pointer hover:bg-white/20 transition"
      >
        <Calendar className="w-5 h-5 text-white" />
        <span className="leading-1.5">Simpan Tanggal</span>
      </a>
    </div>
  );
}
