import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyToken(token);

  const admin = await prisma.adminUser.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!admin) {
    throw new Error("Admin tidak ditemukan");
  }

  return admin;
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    await getCurrentAdmin();
    return true;
  } catch {
    return false;
  }
}