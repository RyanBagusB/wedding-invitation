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

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST: Tambah komentar baru
export async function POST(req) {
  try {
    const body = await req.json();
    const { message, invitationId } = body;

    if (!message || !invitationId) {
      return NextResponse.json(
        { error: "Message and invitationId are required" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        message,
        invitationId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
