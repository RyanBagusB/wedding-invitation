import { Eye, Pencil, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";

export default function InvitationActions({ row, onAction }) {
  return (
    <div className="flex gap-2">
      <Button variant="blue" size="icon" onClick={() => onAction(row, "detail")}>
        <Eye className="w-4 h-4" />
      </Button>
      <Button variant="green" size="icon" onClick={() => onAction(row, "edit")}>
        <Pencil className="w-4 h-4" />
      </Button>
      <Button variant="red" size="icon" onClick={() => onAction(row, "delete")}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
