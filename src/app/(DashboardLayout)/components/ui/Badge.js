// src/components/invitations/StatusBadge.js
export default function StatusBadge({ status, type }) {
  let bg = "", text = "";

  if (type === "sent") {
    bg = status === "Terkirim" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
    text = status;
  } else if (type === "scanned") {
    bg = status === "Hadir" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800";
    text = status;
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bg}`}>
      {text}
    </span>
  );
}
