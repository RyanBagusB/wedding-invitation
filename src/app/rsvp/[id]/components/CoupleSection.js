"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import img1 from "../../../../images/0-PEMBUKA.jpg";
import { useEffect, useState } from "react";

const images = [img1, img1, img1];

export default function CoupleSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center bg-[#ffffffee] py-18 text-[rgb(94,94,94)] gap-y-14">
      <div className="flex flex-col items-center gap-y-8 px-4 max-w-2xl">
        <div>
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="font-analogue italic text-4xl tracking-wide"
          >
            Kedua
          </motion.h2>

          <motion.h2
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="font-creattion italic leading-5 ml-8 text-5xl tracking-wide"
          >
            Mempelai
          </motion.h2>
        </div>

        <motion.div
          className="flex flex-col gap-y-6 text-center"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p className="font-poppins font-bold text-xs tracking-widest leading-loose">
            Assalamu’alaikum Warahmatullahi Wabarakatuh
          </p>
          <p className="font-poppins text-xs tracking-wide leading-relaxed">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. 
            Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col w-full gap-y-14">
        <div className="flex flex-col gap-y-12">
          <motion.div
            initial={{ scale: 1.08, opacity: 0, filter: "blur(10px)" }}
            whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 2.4,
              ease: [0.25, 1, 0.5, 1], // lebih smooth, alami
            }}
            viewport={{ once: false, amount: 0.4 }}
            className="relative inline-block w-fit overflow-hidden shadow-[20px_20px_0px_rgba(234,234,234,0.6)]"
          >
            <div className="w-3xs h-84 relative">
              <AnimatePresence initial={false} custom={index}>
                <motion.div
                  key={index}
                  custom={index}
                  initial={{ x: "20%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-20%", opacity: 0 }}
                  transition={{
                    duration: 2, // sedikit lebih panjang
                    ease: [0.25, 1, 0.5, 1],
                    delay: 0.2, // beri jeda agar lebih bernafas
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[index]}
                    alt="Bride"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute top-0 right-0 w-16 h-full pointer-events-none bg-gradient-to-l from-black/15 to-transparent"></div>

            <motion.div
              initial={{ y: "-30%", opacity: 0 }}
              animate={{ y: "-50%", opacity: 1 }}
              transition={{
                duration: 2.2,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.5, // teks muncul sedikit setelah gambar
              }}
              className="absolute top-1/2 right-2 font-creattion text-5xl text-white tracking-[0.2em]"
              style={{ writingMode: "vertical-rl" }}
            >
              Prisella
            </motion.div>
          </motion.div>
          <div className="flex flex-col gap-y-4 pl-6">
            <motion.h3
              initial={{ y: -40, opacity: 0, filter: "blur(6px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.77, 0, 0.175, 1] }}
              viewport={{ once: false, amount: 0.4 }}
              className="font-analogue text-3xl"
            >
              Prisella Ayu Dio Oktavia
            </motion.h3>

            <motion.div
              initial={{ y: -40, opacity: 0, filter: "blur(6px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              viewport={{ once: false, amount: 0.4 }}
              className="flex flex-col font-poppins text-xs"
            >
              <h4 className="font-semibold">Putri Pertama dari</h4>
              <p>Bapak Agus Budhi Santoso dan Ibu Rustiyah</p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-y-12 self-end">
          <motion.div
            initial={{ scale: 1.08, opacity: 0, filter: "blur(10px)" }}
            whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 2.4,
              ease: [0.25, 1, 0.5, 1],
            }}
            viewport={{ once: false, amount: 0.4 }}
            className="relative inline-block w-fit overflow-hidden shadow-[-20px_20px_0px_rgba(234,234,234,0.6)] self-end" 
          >
            <div className="w-3xs h-84 relative">
              <AnimatePresence initial={false} custom={index}>
                <motion.div
                  key={index}
                  custom={index}
                  initial={{ x: "-20%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "20%", opacity: 0 }}
                  transition={{
                    duration: 2,
                    ease: [0.25, 1, 0.5, 1],
                    delay: 0.2,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[index]}
                    alt="Bride"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute top-0 left-0 w-16 h-full pointer-events-none bg-gradient-to-r from-black/15 to-transparent"></div>

            <motion.div
              initial={{ y: "-30%", opacity: 0 }}
              animate={{ y: "-50%", opacity: 1 }}
              transition={{
                duration: 2.2,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.5,
              }}
              className="absolute top-1/2 left-2 font-creattion text-5xl text-white tracking-[0.2em]"
              style={{
                writingMode: "sideways-lr",
              }}
            >
              Rohmad
            </motion.div>
          </motion.div>
          <div className="flex flex-col gap-y-4 pr-6 text-right">
            <motion.h3
              initial={{ y: -40, opacity: 0, filter: "blur(6px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.77, 0, 0.175, 1] }}
              viewport={{ once: false, amount: 0.4 }}
              className="font-analogue text-3xl"
            >
              Rohmad Karyadi
            </motion.h3>

            <motion.div
              initial={{ y: -40, opacity: 0, filter: "blur(6px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              viewport={{ once: false, amount: 0.4 }}
              className="flex flex-col font-poppins text-xs"
            >
              <h4 className="font-semibold">Putra Pertama dari</h4>
              <p>Bapak Alm. Budiaji dan Ibu Kartining</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
