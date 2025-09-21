import { Users } from "lucide-react";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Card from "../../components/ui/card/Index";
import InvitationsTable from "./InvitationsTable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function InvitationsPage() {
  const invitations = await prisma.invitation.findMany({
    select: {
      id: true,
      guestName: true,
      scanned: true,
      rsvpStatus: true,
      inviter: {
        select: {
          username: true
        }
      }
    }
  });

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-violet-50">
            Daftar Tamu
          </h2>
          <Breadcrumbs />
        </div>
      </div>

      <Card>
        <Card.Header className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h3 className="text-lg sm:text-xl font-semibold">Daftar Tamu</h3>
        </Card.Header>
        <Card.Body>
          <InvitationsTable invitations={invitations} />
        </Card.Body>
      </Card>
    </div>
  );
}
