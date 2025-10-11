"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";

export default function AddInvitationForm({ onAdd }) {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd({
      guestName: name,
      arrivalTime,
    });
    setName(""); // reset
    setArrivalTime("");
    setOpenModal(false);
  };

  return (
    <>
      <Button variant="primary" size="md" onClick={() => setOpenModal(true)}>
        <Plus className="w-5 h-5" aria-hidden="true" />
        <span className="hidden sm:flex">Tambah Tamu</span>
      </Button>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Tambah Tamu"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            label="Nama Tamu"
            type="text"
            placeholder="Masukkan nama tamu"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            id="arrivalTime"
            name="arrivalTime"
            label="Waktu Kedatangan"
            type="time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setOpenModal(false)}>
              Batal
            </Button>
            <Button size="md" type="submit" variant="primary">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
