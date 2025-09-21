import { Badge } from "lucide-react";
import DataTable from "../../components/ui/DataTable";

export default function MyInvitationsTable({ invitations }) {
  const data = invitations.map((inv, idx) => ({
    number: idx + 1,
    guestName: inv.guestName,
    rsvpStatus: inv.rsvpStatus,
    barcode: inv.barcode,
    sentStatus: inv.sentStatus,
    scanned: inv.scanned ? "Hadir" : "Tidak Hadir",
  }));

  const columns = [
    { header: "No", accessor: "number" },
    { header: "Nama Tamu", accessor: "guestName" },
    { header: "Konfirmasi Kehadiran", accessor: "rsvpStatus" },
    { header: "Status Terkirim", accessor: "sentStatus" },
    { header: "Barcode", accessor: "barcode" },
    {
      header: "Hadir",
      accessor: "scanned",
      cell: (row) => <Badge status={row.scanned} />,
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
