import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import InvitationsWrapper from "./InvitationsWrapper";

const prisma = new PrismaClient();

// Meta title untuk page
export const metadata = {
  title: "Kelola Tamu | Wedding",
};

export default async function MyInvitationsPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const role = cookieStore.get("role")?.value;

  if (role !== "ADMIN") notFound();

  const userId = authToken.replace("dummy_token_", "");
  const inviter = await prisma.user.findUnique({ where: { id: userId } });
  const myInvitations = await prisma.invitation.findMany({
    where: { inviterId: userId },
  });

  return (
    <InvitationsWrapper
      inviter={inviter.username}
      initialInvitations={myInvitations}
      userId={userId}
    />
  );
}
