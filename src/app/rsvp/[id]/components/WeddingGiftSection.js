"use client";

import { Copy, CreditCard } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../../../../images/0-PEMBUKA.jpg";

const accounts = [
  {
    bank: "BCA",
    logo: img1,
    number: "123123123",
    name: "Putri Cantika Sari",
  },
  {
    bank: "BCA",
    logo: img1,
    number: "321321321",
    name: "Putra Andika Pratama",
  },
];

export default function GiftSection() {
  const [showAccounts, setShowAccounts] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin!");
  };

  return (
    <section className="space-y-6 bg-[#5E5E5E50] p-8 text-white flex flex-col justify-center items-center">
      {/* Judul */}
      <div className="text-center flex flex-col justify-center items-center gap-y-6">
        <Image src={img1} alt="" className="object-cover aspect-video" />
        <h2 className="font-analogue text-4xl italic text-center">
          Wedding Gift
        </h2>
        <p className="text-xs font-poppins px-10 text-center tracking-wide">
          Doa Restu Anda merupakan karunia yang sangat berarti bagi kami.
        </p>
        <p className="text-xs font-poppins px-4 text-center tracking-wide">
          Dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi melalui di bawah ini.
        </p>

        <AnimatePresence>
          {!showAccounts && (
            <motion.button
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setShowAccounts(true)}
              className="flex items-center gap-2 bg-white text-xs tracking-widest text-[#333] px-4 py-2 rounded shadow"
            >
              <CreditCard size={16} className="text-[#333]" />
              Klik Di Sini
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          initial={false}
          animate={{
            opacity: showAccounts ? 1 : 0,
            height: showAccounts ? "auto" : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="space-y-4 w-full overflow-hidden"
        >
          {accounts.map((acc, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: showAccounts ? 1 : 0,
                y: showAccounts ? 0 : 20,
              }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center justify-between border border-white/40 bg-white/10 backdrop-blur-md p-3"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={acc.logo}
                  alt={acc.bank}
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <div className="font-poppins">
                  <p className="text-xs italic">No Rekening</p>
                  <p className="text-base font-semibold tracking-wide">
                    {acc.number}
                  </p>
                  <p className="text-xs">a.n {acc.name}</p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(acc.number)}
                className="flex items-center gap-2 px-3 py-1 bg-white text-xs tracking-widest text-[#333] transition"
              >
                <Copy size={12} />
                Salin
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
