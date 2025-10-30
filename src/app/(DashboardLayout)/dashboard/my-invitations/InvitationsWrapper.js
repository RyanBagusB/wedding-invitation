"use client";

import { useState } from "react";
import MyInvitationsTable from "./MyInvitationsTable";
import AddInvitationForm from "./AddInvitationForm";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Card from "../../components/ui/card/Index";
import { UserCheck, Search } from "lucide-react";

export default function InvitationsWrapper({ inviter, initialInvitations, userId }) {
  const [invitations, setInvitations] = useState(initialInvitations);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const handleAdd = async ({ guestName, arrivalTime }) => {
    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestName, arrivalTime, userId }),
    });

    if (!res.ok) {
      throw new Error("Gagal menambahkan tamu");
    }

    const newInv = await res.json();
    setInvitations((prev) => [...prev, newInv]);
  };

  const handleUpdate = async (updated) => {
    let payload = { ...updated };

    if (updated.arrivalTime && updated.arrivalTime !== "-") {
      const dateStr = "2025-11-08";

      payload.arrivalTime = `${dateStr}T${updated.arrivalTime}:00.000z`;
    }

    const res = await fetch(`/api/invitations/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Gagal memperbarui tamu");
    }

    const newData = await res.json();
    setInvitations((prev) =>
      prev.map((inv) => (inv.id === newData.id ? newData : inv))
    );
  };

  const handleDelete = async (deleted) => {
    await fetch(`/api/invitations/${deleted.id}`, { method: "DELETE" });
    setInvitations((prev) => prev.filter((inv) => inv.id !== deleted.id));
  };

  // 🔹 Filter logic
  const filtered = invitations.filter((inv) => {
    // --- Search dulu ---
    if (search && !inv.guestName.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    if (filter === "ALL") return true;

    // status terkirim
    if (filter === "SENT_TRUE") return inv.sentStatus === true;
    if (filter === "SENT_FALSE") return inv.sentStatus === false;

    // konfirmasi kehadiran (RSVP)
    if (filter === "PENDING") return inv.rsvpStatus === "PENDING";
    if (filter === "ATTENDING") return inv.rsvpStatus === "ATTENDING";
    if (filter === "NOT_ATTENDING") return inv.rsvpStatus === "NOT_ATTENDING";

    // hadir (scanned)
    if (filter === "HADIR_TRUE") return inv.scanned === true;
    if (filter === "HADIR_FALSE") return inv.scanned === false;

    return true;
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

        <AddInvitationForm onAdd={handleAdd} />
      </div>

      <Card>
        <Card.Header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Judul */}
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <h3 className="text-lg sm:text-xl font-semibold">Kelola Tamu</h3>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari tamu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
            >
              <option value="ALL">Semua</option>

              <optgroup label="Status Terkirim">
                <option value="SENT_TRUE">Sudah Dikirim</option>
                <option value="SENT_FALSE">Belum Dikirim</option>
              </optgroup>

              <optgroup label="Konfirmasi Kehadiran">
                <option value="PENDING">Pending</option>
                <option value="ATTENDING">Bisa Hadir</option>
                <option value="NOT_ATTENDING">Tidak Bisa</option>
              </optgroup>

              <optgroup label="Hadir (Scan)">
                <option value="HADIR_TRUE">Hadir</option>
                <option value="HADIR_FALSE">Tidak Hadir</option>
              </optgroup>
            </select>
          </div>
        </Card.Header>

        <Card.Body>
          <MyInvitationsTable
            inviter={inviter}
            invitations={filtered}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
