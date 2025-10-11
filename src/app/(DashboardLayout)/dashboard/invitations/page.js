// app/invitations/page.js
import { PrismaClient } from "@prisma/client";
import InvitationsTable from "./InvitationsTable";
import Card from "../../components/ui/card/Index";
import { Users, Filter, Search } from "lucide-react";
import Button from "../../components/ui/Button";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const prisma = new PrismaClient();

export const metadata = {
  title: "Daftar Tamu | Wedding",
};

export default async function InvitationsPage({ searchParams }) {
  const { status, scanned, q } = await searchParams || {};

  const invitations = await prisma.invitation.findMany({
    where: {
      ...(status ? { rsvpStatus: status } : {}),
      ...(scanned ? { scanned: scanned === "true" } : {}),
      ...(q
        ? {
            guestName: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {}),
    },
    select: {
      id: true,
      guestName: true,
      scanned: true,
      rsvpStatus: true,
      inviter: { select: { username: true } },
      arrivalTime: true,
    },
    orderBy: { createdAt: "desc" },
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
        <Card.Header className="flex items-center gap-x-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h3 className="text-lg sm:text-xl font-semibold">Filter & Cari Tamu</h3>
        </Card.Header>
        <Card.Body>
          <form method="GET" className="flex flex-wrap items-center gap-3">
            <select
              name="status"
              defaultValue={status || ""}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Semua Status</option>
              <option value="PENDING">Pending</option>
              <option value="ATTENDING">Hadir</option>
              <option value="NOT_ATTENDING">Tidak Hadir</option>
            </select>

            <select
              name="scanned"
              defaultValue={scanned || ""}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Semua Kehadiran</option>
              <option value="true">Sudah Scan</option>
              <option value="false">Belum Scan</option>
            </select>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Cari nama tamu..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <Button
              size="md"
              type="submit"
            >
              Terapkan
            </Button>
          </form>
        </Card.Body>
      </Card>

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
