"use client";

import { motion } from "framer-motion";
import imgTreeShadow from "../../../../images/img-tree-shadow-01.png";

export default function VerseSection() {
  return (
    <section className="relative flex flex-col justify-center items-center bg-[#EAEAEA] py-18 px-4 text-[rgb(94,94,94)] overflow-hidden gap-y-8">
      <div
        className="absolute inset-0 bg-no-repeat bg-top-right"
        style={{
          backgroundImage: `url(${imgTreeShadow.src})`,
          backgroundSize: "400px auto",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      ></div>

      <div className="font-editors-light flex items-center gap-x-6 text-6xl font-semibold">
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.6 }}
        >
          S
        </motion.h2>

        <motion.span
          className="w-px h-24 bg-[rgb(94,94,94)]"
          initial={{ opacity: 0, filter: "blur(6px)", scaleX: 1.5 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scaleX: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)", scaleX: 1.5 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false, amount: 0.6 }}
        ></motion.span>

        <motion.h2
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.6 }}
        >
          R
        </motion.h2>
      </div>

      <motion.i
        className="max-w-2xl text-center leading-relaxed font-light font-poppins text-xs"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: false, amount: 0.6 }}
      >
        &quot;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
        untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
        dan Dia menjadikan di antaramu rasa kasih dan sayang.&quot;
      </motion.i>

      <motion.i
        className="text-xl tracking-widest font-analogue font-semibold"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: false, amount: 0.6 }}
      >
        Q.S Ar-Rum : 21
      </motion.i>
    </section>
  );
}
