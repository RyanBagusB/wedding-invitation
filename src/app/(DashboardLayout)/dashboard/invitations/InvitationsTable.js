"use client";

import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";

export default function InvitationsTable({ invitations }) {
  const statusMap = {
    PENDING: { label: "Pending", type: "yellow" },
    ATTENDING: { label: "Bisa Hadir", type: "green" },
    NOT_ATTENDING: { label: "Tidak Bisa", type: "red" },
  };

  const data = invitations.map((inv, index) => ({
    number: index + 1,
    guestName: inv.guestName,
    inviter: inv.inviter.username,
    arrivalTime: inv.arrivalTime
      ? new Date(inv.arrivalTime).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        })
      : "-",
    rsvpStatus: statusMap[inv.rsvpStatus]?.label || "Tidak Diketahui",
    rsvpType: statusMap[inv.rsvpStatus]?.type || "gray",
    scanned: inv.scanned ? "Hadir" : "Tidak Hadir",
  }));

  const columns = [
    { header: "No", accessor: "number" },
    { header: "Nama Tamu", accessor: "guestName" },
    { header: "Tamu Dari", accessor: "inviter" },
    { 
      header: "Jam Kedatangan", 
      accessor: "arrivalTime",
      cell: (row) => <span>{row.arrivalTime}</span>,
    },
    {
      header: "Konfirmasi Kehadiran",
      accessor: "rsvpStatus",
      cell: (row) => (
        <StatusBadge type={row.rsvpType} status={row.rsvpStatus} />
      ),
    },
    {
      header: "Hadir",
      accessor: "scanned",
      cell: (row) => (
        <StatusBadge
          type={row.scanned === "Hadir" ? "green" : "red"}
          status={row.scanned}
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
