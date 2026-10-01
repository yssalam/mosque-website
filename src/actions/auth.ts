"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createToken, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/validations/auth";

export async function loginAdmin(
  _prevState: { success: boolean; message: string } | null,
  formData: FormData,
) {
  // Ambil data dari form
  const values = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Validasi Zod
  const validated = loginSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  const { email, password } = validated.data;

  // Cek admin berdasarkan email
  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!admin) {
    return {
      success: false,
      message: "Email yang dimasukan salah.",
    };
  }

  // Cek password admin
  const isValid = await verifyPassword(password, admin.password);

  if (!isValid) {
    return {
      success: false,
      message: "Password yang dimasukan salah.",
    };
  }

  // Buat JWT
  const token = await createToken({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  });

  // Simpan ke HTTP Only Cookie
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });

  redirect("/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete("session");

  redirect("/login");
}
