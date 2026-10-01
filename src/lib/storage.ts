import { supabase } from "@/lib/supabase";

const BUCKET = "articles";

export function getStoragePathFromPublicUrl(publicUrl: string): string | null {
  try {
    const url = new URL(publicUrl);

    const marker = `/storage/v1/object/public/${BUCKET}/`;

    const index = url.pathname.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch {
    return null;
  }
}

export async function deleteStorageFile(publicUrl: string) {
  const path = getStoragePathFromPublicUrl(publicUrl);

  if (!path) {
    return {
      success: false,
      message: "Path file tidak ditemukan.",
    };
  }

  const { error } = await supabase.storage.from(BUCKET).remove([path]);

  if (error) {
    console.error("DELETE STORAGE ERROR:", error);

    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
  };
}

export async function deleteStorageFiles(
  publicUrls: (string | null | undefined)[],
) {
  const paths = publicUrls
    .map((url) => (url ? getStoragePathFromPublicUrl(url) : null))
    .filter((path): path is string => Boolean(path));

  if (paths.length === 0) {
    return { success: true };
  }

  const { error } = await supabase.storage.from(BUCKET).remove(paths);

  if (error) {
    console.error("DELETE STORAGE FILES ERROR:", error, paths);

    return {
      success: false,
      message: error.message,
    };
  }

  return { success: true };
}
