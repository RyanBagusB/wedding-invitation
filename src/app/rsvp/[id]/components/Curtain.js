"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import curtainImg from "../../../../images/0-PEMBUKA.jpg";
import { Mail } from "lucide-react";

export default function Curtain({ name, opened, onOpen }) {
  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          key="curtain"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center h-dvh overflow-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src={curtainImg}
              alt="Tirai"
              fill
              style={{ objectFit: "cover" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.45) 20%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0) 50%)",
                pointerEvents: "none",
              }}
            />
          </div>

          <div className="absolute flex flex-col items-center justify-end inset-0 py-10 px-4 text-white text-center gap-y-6">
            <div className="flex flex-col gap-y-2 text-center">
              <motion.h3
                className="text-base font-semibold tracking-widest"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              >
                THE WEDDING OF
              </motion.h3>
              <motion.h2
                className="font-analogue text-4xl tracking-wide"
                initial={{ scale: 0.8, opacity: 0 }} // mulai kecil & transparan
                animate={{ scale: 1, opacity: 1 }}   // membesar & terlihat
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              >
                Prisella & Rohmad
              </motion.h2>
            </div>

            <div className="flex flex-col gap-y-6 font-poppins">
              <motion.div
                className="flex flex-col gap-y-1 text-[14px] tracking-widest"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                <p>Kepada Yth.</p>
                <p>{name}</p>
                <motion.p
                  className="text-[10px] italic tracking-normal mt-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
                >
                  *Mohon maaf jika ada kesalahan dalam penulisan nama / gelar.
                </motion.p>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                className="flex justify-center"
              >
                <motion.button
                  className="flex items-center justify-center gap-2 text-[14px] font-poppins px-4 py-2 border border-white/40 bg-white/10 backdrop-blur-md cursor-pointer"
                  onClick={onOpen}
                  animate={{ y: 0, opacity: 1, scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  whileHover={{ scale: 0.95, transition: { type: "tween", duration: 0.3, ease: "easeInOut" } }}
                >
                  <Mail className="w-5 h-5 text-white" />
                  <span className="leading-1.5">Buka Undangan</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
