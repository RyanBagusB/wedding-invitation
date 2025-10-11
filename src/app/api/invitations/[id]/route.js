import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();
    
    const updated = await prisma.invitation.update({
      where: { id },
      data: {
        guestName: body.guestName,
        sentStatus: body.sentStatus,
        ...(body.arrivalTime && body.arrivalTime !== "-" && { arrivalTime: body.arrivalTime }),
      },
    });

    return Response.json(updated);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await prisma.invitation.delete({
      where: { id },
    });
    return Response.json({ success: true });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
