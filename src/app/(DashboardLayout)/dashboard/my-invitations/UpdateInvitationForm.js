import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function UpdateInvitationForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [guestName, setGuestName] = useState(initialData?.guestName || "");
  const [sentStatus, setSentStatus] = useState(
    initialData?.sentStatus === true || initialData?.sentStatus === "true"
  );
  const [arrivalTime, setArrivalTime] = useState(() => {
    let val = initialData?.arrivalTime;

    if (!val || val === "-") return "";

    val = val.replace(".", ":");

    if (/^\d{2}:\d{2}$/.test(val)) {
      return val;
    }

    const date = new Date(val);
    if (!isNaN(date)) {
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      });
    }

    return "";
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...initialData,
      guestName,
      sentStatus,
      arrivalTime,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        id="guestName"
        name="guestName"
        label="Nama Tamu"
        type="text"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />

      <div className="flex flex-col gap-1">
        <label
          htmlFor="sentStatus"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Status Terkirim
        </label>
        <select
          id="sentStatus"
          name="sentStatus"
          className="border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white"
          value={sentStatus ? "true" : "false"}
          onChange={(e) => setSentStatus(e.target.value === "true")}
        >
          <option value="false">Belum Dikirim</option>
          <option value="true">Sudah Dikirim</option>
        </select>
      </div>

      <Input
        id="arrivalTime"
        name="arrivalTime"
        label="Waktu Kedatangan"
        type="time"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" variant="primary">
          Simpan
        </Button>
      </div>
    </form>
  );
}
