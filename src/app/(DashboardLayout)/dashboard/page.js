// app/(DashboardLayout)/dashboard/page.js
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import OverviewCard from "../components/ui/OverviewCard";
import DataTable from "../components/ui/DataTable";
import Card from "../components/ui/card/Index";
import StatusBadge from "../components/ui/StatusBadge";
import { Users, UserCheck, QrCode, UsersRound } from "lucide-react";

const prisma = new PrismaClient();

// Meta title untuk halaman dashboard
export const metadata = {
  title: "Dashboard | Wedding",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const userId = authToken?.replace("dummy_token_", "");

  const myTotalInvitations = await prisma.invitation.count({
    where: { inviterId: userId },
  });

  const myAttending = await prisma.invitation.count({
    where: { inviterId: userId, rsvpStatus: "ATTENDING" },
  });

  const myScanned = await prisma.invitation.count({
    where: { inviterId: userId, scanned: true },
  });

  const totalAllGuests = await prisma.invitation.count();

  const latestInvitations = await prisma.invitation.findMany({
    where: { inviterId: userId },
    take: 10,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      guestName: true,
      rsvpStatus: true,
      scanned: true,
      createdAt: true,
    },
  });

  const columns = [
    { header: "Nama Tamu", accessor: "guestName" },
    { header: "Status RSVP", accessor: "rsvpStatus" },
    {
      header: "Hadir",
      accessor: "scanned",
      cell: (row) => (
        <StatusBadge
          type={row.scanned ? "green" : "red"}
          status={row.scanned ? "Hadir" : "Belum Scan"}
        />
      ),
    },
    {
      header: "Tanggal",
      accessor: "createdAt",
      cell: (row) =>
        new Date(row.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-violet-50">
            Dashboard
          </h2>
          <Breadcrumbs />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <OverviewCard
          title="Tamu Saya"
          value={myTotalInvitations}
          icon={Users}
          iconColor="text-green-500"
        />
        <OverviewCard
          title="Bisa Hadir"
          value={myAttending}
          icon={UserCheck}
          iconColor="text-green-600"
        />
        <OverviewCard
          title="Sudah Scan"
          value={myScanned}
          icon={QrCode}
          iconColor="text-indigo-500"
        />
        <OverviewCard
          title="Total Semua Tamu"
          value={totalAllGuests}
          icon={UsersRound}
          iconColor="text-yellow-500"
        />
      </div>

      <Card>
        <Card.Header className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-violet-50">
            Undangan Saya
          </h3>
        </Card.Header>
        <Card.Body className="p-0">
          <DataTable columns={columns} data={latestInvitations} />
        </Card.Body>
      </Card>
    </div>
  );
}
