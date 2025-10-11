import { PrismaClient } from "@prisma/client";
import InvitationPageClient from "./InvitationPageClient"; // import Client Component

const prisma = new PrismaClient();

async function getInvitation(id) {
  return prisma.invitation.findUnique({
    where: { id },
    select: {
      guestName: true,
      rsvpStatus: true,
      barcode: true,
    },
  });
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const invitation = await getInvitation(id);
  const guestName = invitation?.guestName ?? "Tamu";

  return {
    title: `Undangan untuk ${guestName}`,
    description: `Halaman undangan untuk ${guestName}. Status RSVP: ${invitation?.rsvpStatus ?? "Belum diketahui"}.`,
    openGraph: {
      title: `Undangan untuk ${guestName}`,
      description: `Status RSVP: ${invitation?.rsvpStatus ?? "Belum diketahui"}`,
    },
  };
}

export default async function InvitationPage({ params }) {
  const { id } = await params;
  const invitation = await getInvitation(id);

  return <InvitationPageClient invitation={invitation} />;
}
