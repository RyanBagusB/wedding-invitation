import { cookies } from "next/headers";
import { UserCheck } from "lucide-react";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Card from "../../components/ui/card/Index";
import { PrismaClient } from "@prisma/client";
import MyInvitationsTable from "./MyInvitationsTable";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function MyInvitationsPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const role = cookieStore.get("role")?.value;

  if (role !== "ADMIN") {
    notFound();
  }

  const userId = authToken.replace("dummy_token_", "");

  const myInvitations = await prisma.invitation.findMany({
    where: { inviterId: userId },
  });

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-violet-50">
            Tamu Saya
          </h2>
          <Breadcrumbs />
        </div>
      </div>

      <Card>
        <Card.Header className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h3 className="text-lg sm:text-xl font-semibold">Kelola Tamu</h3>
        </Card.Header>
        <Card.Body>
          <MyInvitationsTable invitations={myInvitations} />
        </Card.Body>
      </Card>
    </div>
  );
}
