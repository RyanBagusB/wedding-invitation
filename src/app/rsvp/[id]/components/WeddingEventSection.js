// components/WeddingEventSection.jsx
"use client";

import { AnimatePresence } from "framer-motion";
import img1 from "../../../../images/akad-nikah.jpeg";
import img2 from "../../../../images/resepsi.jpeg";
import Image from "next/image";
import { Clock } from "lucide-react";

export default function WeddingEventSection() {
  return (
    <section className="text-white py-10 bg-black/20">
      {/* Header */}
      <div className="flex items-center w-full mb-6">
        <div className="flex flex-col px-4 w-1/2">
          <h2 className="font-analogue text-4xl">Wedding</h2>
          <h2 className="font-creattion text-5xl">Event</h2>
        </div>
        <div className="flex-1 h-[0.5px] bg-white" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-y-18">
        <div className="w-full pl-4 pr-8">
          {/* Image slider */}
          <div className="w-full relative overflow-hidden aspect-video rounded-tr-[100px] bg-white">
            <AnimatePresence initial={false} mode="wait">
              <div className="absolute inset-0 bg-white">
                <Image
                  src={img1}
                  alt="Akad Nikah"
                  className="object-cover w-full h-full bg-white"
                />
              </div>
            </AnimatePresence>
          </div>

          {/* Event info */}
          <div className="flex bg-white">
            <div className="bg-[#333333] flex justify-center items-center px-4 py-10">
              <p
                className="text-4xl font-analogue"
                style={{ writingMode: "sideways-lr" }}
              >
                Akad Nikah
              </p>
            </div>
            <div className="flex flex-col p-6 text-[#5e5e5e] gap-y-2 w-full">
              <div className="flex border-b border-[#5e5e5e] gap-x-4 px-4 py-4 w-full">
                <p className="text-6xl font-analogue">17</p>
                <div className="flex flex-col text-sm">
                  <p>Kamis</p>
                  <p>April</p>
                  <p>2025</p>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-2  text-[#5e5e5e]">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">08:00</span>
                </div>

                <p className="text-sm tracking-widest font-bold">LOKASI ACARA</p>

                <div className="text-xs">
                  <p className="font-bold">Masjid Al Ukhuwwah</p>
                  <p>Permata Sukodono Raya</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pr-4 pl-8">
          {/* Image slider */}
          <div className="w-full relative overflow-hidden aspect-video rounded-tl-[100px] bg-white">
            <AnimatePresence initial={false} mode="wait">
              <div className="absolute inset-0 bg-white">
                <Image
                  src={img2}
                  alt="Resepsi"
                  className="object-cover w-full h-full bg-white"
                />
              </div>
            </AnimatePresence>
          </div>

          {/* Event info */}
          <div className="flex bg-white">
            <div className="flex flex-col p-6 text-[#5e5e5e] gap-y-2 w-full">
              <div className="flex border-b border-[#5e5e5e] gap-x-4 px-4 py-4 w-full">
                <p className="text-6xl font-analogue">8</p>
                <div className="flex flex-col text-sm">
                  <p>Sabtu</p>
                  <p>November</p>
                  <p>2025</p>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-2  text-[#5e5e5e]">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">16:00 - Selesai</span>
                </div>

                <p className="text-sm tracking-widest font-bold">LOKASI ACARA</p>

                <div className="text-xs">
                  <p className="font-bold">Perumahan Permata Sukodono Raya</p>
                  <p>Perumahan Permata Sukodono Raya C1 No 17</p>
                </div>
              </div>
            </div>
              <div className="bg-[#333333] flex justify-center items-center px-4 py-10">
                <p
                  className="text-4xl font-analogue"
                  style={{ writingMode: "vertical-rl" }}
                >
                  Resepsi
                </p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
