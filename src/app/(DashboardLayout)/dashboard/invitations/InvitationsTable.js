"use client";

import DataTable from "../../components/ui/DataTable";
import { Badge } from "lucide-react";

export default function InvitationsTable({ invitations }) {
  const data = invitations.map((inv, index) => ({
    number: index + 1,
    guestName: inv.guestName,
    inviter: inv.inviter.username,
    rsvpStatus: inv.rsvpStatus,
    scanned: inv.scanned ? "Hadir" : "Tidak Hadir",
  }));

  const columns = [
    { header: "No", accessor: "number" },
    { header: "Nama Tamu", accessor: "guestName" },
    { header: "Tamu Dari", accessor: "inviter" },
    { header: "Konfirmasi Kehadiran", accessor: "rsvpStatus" },
    {
      header: "Hadir",
      accessor: "scanned",
      cell: (row) => <Badge status={row.scanned} type="scanned" />,
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
