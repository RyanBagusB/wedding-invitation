import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import UpdateInvitationForm from "./UpdateInvitationForm";
import { useState } from "react";

export default function InvitationModal({
  isOpen,
  mode,
  selected,
  onClose,
  onUpdate,
  onDelete,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // base URL untuk RSVP
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";

  const rsvpLink = `${baseUrl}/rsvp/${selected?.id}`;

  const handleCopy = () => {
    const fullText = `
Assalamu'alaikum Warahmatullahi Wabarakatuh.

Maha suci Allah yang telah menjadikan segala sesuatu lebih indah dan sempurna.

Izinkan kami mengundang Bapak/Ibu/Sahabat sekalian untuk dapat menghadiri acara pernikahan kami.

Link undangan: ${rsvpLink}

Kehadiran, doa dan restu anda semua adalah kado terindah bagi kami. Tiada yang dapat kami ungkapkan selain rasa terima kasih dari hati yang tulus dan dalam.

Kami yang berbahagia

Prisella & Rohmad
    `;
    navigator.clipboard.writeText(fullText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === "detail"
          ? "Detail Tamu"
          : mode === "edit"
          ? "Edit Tamu"
          : "Hapus Tamu"
      }
    >
      {/* Body scrollable */}
      <div className="max-h-[60vh] overflow-y-auto space-y-4">
        {mode === "detail" && selected && (
          <>
            <p>Assalamu&apos;alaikum Warahmatullahi Wabarakatuh.</p>
            <p>Maha suci Allah yang telah menjadikan segala sesuatu lebih indah dan sempurna.</p>
            <p>
              Izinkan kami mengundang Bapak/Ibu/Sahabat sekalian untuk dapat menghadiri acara pernikahan kami.
            </p>
            <p>
              Link undangan: <br />
              <span className="break-all font-mono">{rsvpLink}</span>
            </p>
            <p>
              Kehadiran, doa dan restu anda semua adalah kado terindah bagi kami. Tiada yang dapat kami ungkapkan selain rasa terima kasih dari hati yang tulus dan dalam.
            </p>
            <p>
              Kami yang berbahagia
              <br />
              Prisella & Rohmad
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="primary" onClick={handleCopy}>
                {copied ? "Tersalin!" : "Salin Undangan"}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Tutup
              </Button>
            </div>
          </>
        )}

        {mode === "edit" && (
          <UpdateInvitationForm
            initialData={selected}
            onSubmit={(data) => {
              onUpdate(data);
              onClose();
            }}
            onCancel={onClose}
          />
        )}

        {mode === "delete" && (
          <div className="space-y-4">
            <p>
              Yakin ingin menghapus tamu <b>{selected?.guestName}</b>?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={onClose}>
                Batal
              </Button>
              <Button
                variant="red"
                onClick={() => {
                  onDelete(selected);
                  onClose();
                }}
              >
                Hapus
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
