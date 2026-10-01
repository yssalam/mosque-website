import { prisma } from "@/lib/prisma";

export async function getMosqueProfile() {
  return prisma.mosqueProfile.findFirst();
}
