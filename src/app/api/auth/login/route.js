import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { error: "Username atau password salah" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ message: "Login sukses" });
  response.cookies.set("auth_token", "dummy_token_" + user.id, { httpOnly: true, path: "/", maxAge: 60*60*24 });
  response.cookies.set("role", user.role, { httpOnly: true, path: "/", maxAge: 60*60*24 });

  return response;
}
