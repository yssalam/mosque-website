"use server";

import { prisma } from "@/lib/prisma";
import { mosqueProfileFormSchema } from "@/validations/mosque-profile";

export async function updateMosqueProfile(formData: FormData) {
  const values = {
    mosqueName: formData.get("mosqueName"),
    description: formData.get("description"),

    address: formData.get("address"),
    latitude: formData.get("latitude")
      ? Number(formData.get("latitude"))
      : undefined,
    longitude: formData.get("longitude")
      ? Number(formData.get("longitude"))
      : undefined,

    phone: formData.get("phone"),
    email: formData.get("email"),
    mapURL: formData.get("mapURL"),

    logoURL: formData.get("logoURL"),
    heroImageURL: formData.get("heroImageURL"),

    shortHistory: formData.get("shortHistory"),
    vision: formData.get("vision"),
    mission: formData.get("mission"),

    operationalHours: formData.get("operationalHours"),
  };

  const validated = mosqueProfileFormSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  const data = validated.data;

  const profile = await prisma.mosqueProfile.findFirst();

  if (!profile) {
    await prisma.mosqueProfile.create({
      data: {
        ...data,
        logoURL: data.logoURL ?? "",
      },
    });
  } else {
    await prisma.mosqueProfile.update({
      where: {
        id: profile.id,
      },
      data,
    });
  }

  return {
    success: true,
    message: "Mosque profile updated successfully.",
  };
}
