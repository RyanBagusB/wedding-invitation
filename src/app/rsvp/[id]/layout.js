"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from "../../../images/pembuka.jpg";
// import img2 from "../../../images/1-COVER-1-150x150.jpg";
// import img3 from "../../../images/1-COVER-2-150x150.jpg";

export default function Layout({ children }) {
  const images = [img1, img1, img1];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex flex-col h-screen overflow-x-hidden overflow-y-auto">
      {/* Semua background selalu ada di DOM, hanya opasitas yang berubah */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img.src})` }}
            animate={{ opacity: index === i ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          />
        ))}
        {/* Layer gelap */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Konten */}
      <div className="relative z-10 flex flex-col">{children}</div>
    </main>
  );
}
