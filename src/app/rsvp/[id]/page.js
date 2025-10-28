import { PrismaClient } from "@prisma/client";
import InvitationPageClient from "./InvitationPageClient"; // import Client Component

const prisma = new PrismaClient();

async function getInvitation(id) {
  return prisma.invitation.findUnique({
    where: { id },
    select: {
      id: true,
      guestName: true,
      rsvpStatus: true,
      barcode: true,
      arrivalTime: true,
    },
  });
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const invitation = await getInvitation(id);
  const guestName = invitation?.guestName ?? "Tamu";

  // gunakan URL absolut agar bisa terbaca oleh social media scrapers
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://prisella-rohmad.vercel.app";

  return {
    title: `Undangan untuk ${guestName} | The Wedding of Prisella & Rohmad`,
    description: `Undangan untuk ${guestName}.`,
    openGraph: {
      title: `Undangan untuk ${guestName} | The Wedding of Prisella & Rohmad`,
      description: `Klik untuk membuka undangan`,
      url: `${baseUrl}/rsvp/${id}`,
      siteName: "The Wedding of Prisella & Rohmad",
      images: [
        {
          url: `${baseUrl}/pengantin.webp`, // foto pengantin kamu
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
      title: `Undangan untuk ${guestName} | The Wedding of Prisella & Rohmad`,
      description: "Klik untuk membuka undangan pernikahan.",
      images: [`${baseUrl}/pengantin.webp`],
    },
  };
}

export default async function InvitationPage({ params }) {
  const { id } = await params;
  const invitation = await getInvitation(id);

  return <InvitationPageClient invitation={invitation} />;
}
