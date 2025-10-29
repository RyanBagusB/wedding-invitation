// components/ClosingSection.jsx
"use client";

export default function ClosingSection() {
  return (
    <section className="relative font-poppins text-center text-white px-8 py-16 pb-24 flex flex-col gap-y-8 text-sm">
      {/* Overlay gradasi dari bawah ke atas */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-y-8">
        <h2 className="text-5xl font-creattion">Terima Kasih</h2>
        <p className="leading-relaxed">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila
          Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do’a restu
          kepada kami.
        </p>
        <p className="font-bold">
          Wassalamu’alaikum warahmatullahi wabarakatuh
        </p>
        <p className="tracking-widest uppercase font-semibold">
          Kami Yang Berbahagia
        </p>
        <p className="font-analogue text-2xl italic font-bold">
          Prisella <span className="font-poppins font-normal">&</span> Rohmad
        </p>
      </div>
    </section>
  );
}
