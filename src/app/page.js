import HomePageClient from "./HomePageClient";
import img1 from "../images/pembuka.jpg";

export async function generateMetadata() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://prisella-rohmad.vercel.app";

  return {
    title: "The Wedding of Prisella & Rohmad",
    description: "Klik untuk membuka undangan",
    openGraph: {
      title: "The Wedding of Prisella & Rohmad",
      description: `Klik untuk membuka undangan`,
      url: baseUrl,
      siteName: "The Wedding of Prisella & Rohmad",
      images: [
        {
          url: `${baseUrl}/pengantin.webp`,
          width: 1200,
          height: 630,
          alt: "Prisella & Rohmad Wedding",
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: " Wedding of Prisella & Rohmad",
      description: "Klik untuk membuka undangan pernikahan.",
      images: [`${baseUrl}/pengantin.webp`],
    },
  };
}

export default async function Home() {
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
      <div className="relative z-10 flex flex-col">
        <HomePageClient />
      </div>
    </main>
  );
}
