"use client";

import { useState } from "react";
import DataTable from "../../components/ui/DataTable";
import InvitationActions from "./InvitationActions";
import InvitationModal from "./InvitationModal";
import StatusBadge from "../../components/ui/StatusBadge";

export default function MyInvitationsTable({ invitations, onUpdate, onDelete }) {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null);

  const openModal = (inv, mode) => {
    const normalized = {
      ...inv,
      sentStatus: inv.sentStatus === "Sudah Dikirim",
      rsvpStatus:
        inv.rsvpStatus === "Bisa Hadir"
          ? "ATTENDING"
          : inv.rsvpStatus === "Tidak Bisa Hadir"
          ? "NOT_ATTENDING"
          : "PENDING",
      scanned: inv.scanned === "Hadir",
    };

    setSelected(normalized);
    setMode(mode);
  };

  const closeModal = () => {
    setSelected(null);
    setMode(null);
  };

  const statusMap = {
    PENDING: { label: "Menunggu Konfirmasi", type: "yellow" },
    ATTENDING: { label: "Bisa Hadir", type: "green" },
    NOT_ATTENDING: { label: "Tidak Bisa Hadir", type: "red" },
  };

  const data = invitations.map((inv, idx) => ({
    ...inv,
    number: idx + 1,
    rsvpStatus: statusMap[inv.rsvpStatus]?.label || "Tidak Diketahui",
    rsvpType: statusMap[inv.rsvpStatus]?.type || "gray",
    sentStatus: inv.sentStatus ? "Sudah Dikirim" : "Belum Dikirim",
    sentType: inv.sentStatus ? "green" : "red",
    scanned: inv.scanned ? "Hadir" : "Belum Hadir",
    arrivalTime: inv.arrivalTime
      ? new Date(inv.arrivalTime).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-",
  }));

  const columns = [
    { header: "No", accessor: "number" },
    { header: "Nama Tamu", accessor: "guestName" },
    {
      header: "Jam Kedatangan",
      accessor: "arrivalTime",
      cell: (row) => <span>{row.arrivalTime}</span>,
    },
    {
      header: "Status Terkirim",
      accessor: "sentStatus",
      cell: (row) => (
        <StatusBadge type={row.sentType} status={row.sentStatus} />
      ),
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
    {
      header: "Aksi",
      accessor: "actions",
      cell: (row) => (
        <InvitationActions row={row} onAction={openModal} />
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />

      <InvitationModal
        isOpen={!!selected}
        mode={mode}
        selected={selected}
        onClose={closeModal}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
}
