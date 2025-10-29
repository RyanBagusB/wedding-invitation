import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Ambil semua komentar
export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        invitation: {
          select: { guestName: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // gabungkan guestName manual agar konsisten di front-end
    const formatted = comments.map((c) => ({
      id: c.id,
      message: c.message,
      guestName: c.invitation?.guestName || c.guestName || "Tamu Undangan",
      createdAt: c.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST: Tambah komentar (baik tamu terdaftar atau tidak)
export async function POST(req) {
  try {
    const body = await req.json();
    const { message, invitationId, guestName } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // tentukan tipe komentar
    let commentData = { message };

    if (invitationId) {
      // tamu terdaftar
      commentData.invitationId = invitationId;
    } else if (guestName) {
      // tamu tidak terdaftar
      commentData.guestName = guestName.trim();
    } else {
      return NextResponse.json(
        { error: "Either guestName or invitationId must be provided" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({ data: commentData });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
