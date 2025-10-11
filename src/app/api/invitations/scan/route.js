import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { barcode } = await req.json();

    if (!barcode) {
      return NextResponse.json(
        { error: "Barcode diperlukan." },
        { status: 400 }
      );
    }

    // cari undangan berdasarkan barcode
    const invitation = await prisma.invitation.findUnique({
      where: { barcode },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Data undangan tidak ditemukan." },
        { status: 404 }
      );
    }

    // kalau sudah pernah discan
    if (invitation.scanned) {
      return NextResponse.json({
        success: false,
        message: `Tamu dengan nama "${invitation.guestName}" sudah tercatat hadir sebelumnya.`,
        guestName: invitation.guestName,
        rsvpStatus: invitation.rsvpStatus,
        scanned: true,
      });
    }

    // update status scanned + RSVP jadi ATTENDING
    const updated = await prisma.invitation.update({
      where: { barcode },
      data: {
        scanned: true,
        rsvpStatus: "ATTENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Kehadiran tamu dengan nama "${updated.guestName}" berhasil dicatat untuk pertama kali.`,
      guestName: updated.guestName,
      rsvpStatus: updated.rsvpStatus,
      scanned: updated.scanned,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: err.message },
      { status: 500 }
    );
  }
}
