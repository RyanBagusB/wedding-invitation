import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const invitations = await prisma.invitation.findMany({
      include: { inviter: true },
      orderBy: { createdAt: "desc" },
    });

    // format arrivalTime jadi HH:mm
    const formatted = invitations.map((inv) => ({
      ...inv,
      arrivalTime: inv.arrivalTime
        ? new Date(inv.arrivalTime).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : null,
    }));

    return Response.json(formatted);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const barcode = crypto.randomBytes(8).toString("hex");

    const newInvitation = await prisma.invitation.create({
      data: {
        guestName: body.guestName,
        // simpan tetap sebagai DateTime (pakai tanggal hari ini + jam yang dikirim)
        arrivalTime: body.arrivalTime
          ? new Date(`${new Date().toISOString().split("T")[0]}T${body.arrivalTime}:00`)
          : null,
        barcode,
        inviterId: body.userId,
      },
    });

    return Response.json(newInvitation);
  } catch (err) {
    console.error(err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
