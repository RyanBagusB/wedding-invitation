"use client";

import { motion } from "framer-motion";
import DownArrows from "./DownArrows";

export default function CoverCountdownSection({ countdown, opened }) {
  return (
    <section
      className="h-dvh w-full flex flex-col items-center justify-end text-white text-center"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.25) 20%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0) 50%)",
        pointerEvents: "none",
      }}
    >
      <div className="w-full flex flex-col gap-y-4 justify-center items-center py-10 px-4">
        <div className="flex flex-col gap-y-1">
          <motion.h3
            initial={{ opacity: 0, y: -5 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-base tracking-widest"
          >
            THE WEDDING OF
          </motion.h3>

          <motion.h2
            initial={{ scale: 0.75, opacity: 0 }}
            animate={opened ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="text-4xl font-analogue tracking-widest text-white"
          >
            Prisella & Rohmad
          </motion.h2>
        </div>

        <div className="flex text-center gap-x-2 text-base font-poppins font-light">
          <span className="tracking-widest">08</span>
          <span>.</span>
          <span className="tracking-widest">11</span>
          <span>.</span>
          <span className="tracking-widest">2025</span>
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={opened ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="w-full flex text-xl font-semibold justify-evenly max-w-xs"
        >
          <div className="flex flex-col">
            <p className="text-2xl">{countdown.days}</p>
            <p className="text-xs leading-1">Hari</p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl">{countdown.hours}</p>
            <p className="text-xs leading-1">Jam</p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl">{countdown.minutes}</p>
            <p className="text-xs leading-1">Menit</p>
          </div>
          <div className="flex flex-col">
            <p className="text-2xl">{countdown.seconds}</p>
            <p className="text-xs leading-1">Detik</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={opened ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        >
          <DownArrows />
        </motion.div>
      </div>
    </section>
  );
}
