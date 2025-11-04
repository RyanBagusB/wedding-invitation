"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// contoh gambar
import img1 from "../../../../images/pembuka.jpg";
import img2 from "../../../../images/save-the-date.jpeg";
import img3 from "../../../../images/akad-nikah.jpeg";
import img4 from "../../../../images/resepsi.jpeg";
import img5 from "../../../../images/gallery.jpeg";

const images = [img1, img2, img3, img4, img5];

export default function GallerySection() {
  const [selected, setSelected] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const [blink, setBlink] = useState(false);
  const intervalRef = useRef(null);
  const thumbnailsRef = useRef([]);

  // Auto play setiap 5 detik
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsAuto(true);
      handleNext();
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePrev = () => {
    setIsAuto(true);
    setSelected((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIsAuto(true);
    setSelected((prev) => (prev + 1) % images.length);
  };

  // Scroll thumbnail aktif hanya jika bukan autoplay
  useEffect(() => {
    setIsAuto(false);
  }, [selected]);

  // Trigger animasi blink tiap kali gambar berubah
  useEffect(() => {
    setBlink(true);
    const timer = setTimeout(() => setBlink(false), 300); // durasi 300ms
    return () => clearTimeout(timer);
  }, [selected]);

  return (
    <section className="bg-[#F5F5F5] flex flex-col py-10 justify-center items-center">
      {/* Header */}
      <div className="flex text-[#5e5e5e] w-full items-center mb-6">
        <div className="flex-1 h-[0.5px] bg-[#5e5e5e]" />
        <div className="pr-8">
          <h2 className="font-analogue text-4xl">Gallery</h2>
          <h2 className="font-creattion italic text-5xl">Our Moments</h2>
        </div>
      </div>

      {/* Main Image */}
      <div className="flex flex-col px-8 max-w-md w-full">
        <div
          className={`relative w-full aspect-[3/4] overflow-hidden ${
            blink ? "animate-[blink_0.3s_ease]" : ""
          }`}
        >
          <Image
            src={images[selected]}
            alt={`Gallery ${selected + 1}`}
            className="object-cover w-full h-full"
            fill
            priority
          />

          {/* Chevron Left */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/ text-white p-2"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Chevron Right */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/ text-white p-2"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex overflow-x-auto gap-2 mt-4 pb-2 px-1 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              ref={(el) => (thumbnailsRef.current[idx] = el)}
              onClick={() => {
                setIsAuto(false);
                setSelected(idx);
              }}
              className="relative w-20 h-20 flex-shrink-0 overflow-hidden"
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
              {selected !== idx && (
                <div className="absolute inset-0 bg-black/40" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Keyframes blink */}
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
