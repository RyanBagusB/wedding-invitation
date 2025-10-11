// app/scan/ScanPageContent.js
"use client";

import { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import Card from "../../components/ui/card/Index";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Modal from "../../components/ui/Modal";
import { BadgeCheck, AlertCircle, Loader2 } from "lucide-react";
import Button from "../../components/ui/Button";

export default function ScanPageContent() {
  const [loading, setLoading] = useState(false);
  const [guest, setGuest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDecode = async (barcode) => {
    if (!barcode || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/invitations/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode }),
      });
      const data = await res.json();
      setGuest(data);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      setGuest({ error: "Terjadi kesalahan server." });
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-violet-50 flex items-center gap-2">
          Scan Undangan
        </h1>
        <Breadcrumbs />
      </div>

      <Card>
        <Card.Header>
          <h3 className="text-lg sm:text-xl font-semibold">
            Arahkan kamera ke barcode undangan
          </h3>
        </Card.Header>
        <Card.Body className="flex flex-col items-center gap-4">
          <div className="w-full max-w-md">
            <Scanner
              onScan={(result) => handleDecode(result?.[0]?.rawValue)}
              onError={(err) => console.error(err)}
              components={{ finder: true }}
              constraints={{ facingMode: { ideal: "environment" } }}
            />
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-violet-600">
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Memproses barcode...</span>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Hasil Scan"
      >
        <div className="flex flex-col items-center text-center gap-3 py-4">
          {guest?.error && (
            <>
              <AlertCircle className="w-12 h-12 text-red-500" />
              <p className="text-red-600 font-medium">{guest.error}</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Silakan coba barcode lain.
              </p>
            </>
          )}

          {guest?.scanned && !guest?.success && (
            <>
              <AlertCircle className="w-12 h-12 text-amber-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-violet-50">
                {guest?.guestName}
              </h3>
              <p className="text-amber-600 font-medium">
                Barcode ini sudah pernah discan sebelumnya
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Status Kehadiran:{" "}
                <span className="font-medium">
                  {guest?.rsvpStatus === "ATTENDING"
                    ? "Hadir"
                    : guest?.rsvpStatus === "NOT_ATTENDING"
                    ? "Tidak Hadir"
                    : "Belum dikonfirmasi"}
                </span>
              </p>
            </>
          )}

          {guest?.success && (
            <>
              <BadgeCheck className="w-12 h-12 text-green-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-violet-50">
                {guest?.guestName}
              </h3>
              <p className="text-green-600 font-medium">{guest?.message}</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Status RSVP:{" "}
                <span className="font-medium">
                  {guest?.rsvpStatus === "ATTENDING"
                    ? "Hadir"
                    : guest?.rsvpStatus === "NOT_ATTENDING"
                    ? "Tidak Hadir"
                    : "Belum dikonfirmasi"}
                </span>
              </p>
            </>
          )}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Tutup
          </Button>
        </div>
      </Modal>
    </div>
  );
}
