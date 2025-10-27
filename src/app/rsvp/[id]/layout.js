"use client";

import img1 from "../../../images/pembuka.jpg";

export default function Layout({ children }) {
  return (
    <main className="relative flex flex-col h-screen overflow-x-hidden overflow-y-auto">
      {/* Semua background selalu ada di DOM, hanya opasitas yang berubah */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img1.src})` }}
        />
        {/* Layer gelap */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Konten */}
      <div className="relative z-10 flex flex-col">{children}</div>
    </main>
  );
}
