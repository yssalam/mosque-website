"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/session";
import { profileSchema } from "@/validations/setting";
import { passwordSchema } from "@/validations/setting";
import { verifyPassword, hashPassword } from "@/lib/auth";

export async function updateProfile(formData: FormData) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const validated = profileSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  const data = validated.data;

  const emailExists = await prisma.adminUser.findFirst({
    where: {
      email: data.email,
      NOT: { id: admin.id },
    },
  });

  if (emailExists) {
    return {
      success: false,
      message: "Email sudah digunakan.",
    };
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data,
  });

  return {
    success: true,
  };
}



export async function changePassword(formData: FormData) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const values = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validated = passwordSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  const data = validated.data;

  const user = await prisma.adminUser.findUnique({
    where: { id: admin.id },
  });

  if (!user) {
    return {
      success: false,
      message: "Admin tidak ditemukan.",
    };
  }

  const isMatch = await verifyPassword(
    data.currentPassword,
    user.password
  );

  if (!isMatch) {
    return {
      success: false,
      message: "Password lama salah.",
    };
  }

  const hashedPassword = await hashPassword(data.newPassword);

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: {
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
}