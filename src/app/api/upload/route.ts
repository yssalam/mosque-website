import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ALLOWED_FOLDERS = [
  "gallery",
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "File tidak ditemukan.",
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format gambar harus JPG, PNG, atau WEBP.",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Ukuran gambar maksimal 5MB.",
        },
        { status: 400 },
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${uuid()}.${ext}`;

    const storagePath =
      typeof folder === "string" && ALLOWED_FOLDERS.includes(folder)
        ? `${folder}/${fileName}`
        : fileName;

    const { error } = await supabase.storage
      .from("articles")
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error("UPLOAD ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 },
      );
    }

    const { data } = supabase.storage
      .from("articles")
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      imageURL: data.publicUrl,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengupload gambar.",
      },
      { status: 500 },
    );
  }
}