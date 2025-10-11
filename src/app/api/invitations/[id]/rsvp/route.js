import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  if (!["ATTENDING", "NOT_ATTENDING"].includes(status)) {
    return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
  }

  const updated = await prisma.invitation.update({
    where: { id },
    data: { rsvpStatus: status },
  });

  return NextResponse.json(updated);
}
