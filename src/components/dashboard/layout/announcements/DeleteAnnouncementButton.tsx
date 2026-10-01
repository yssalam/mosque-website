"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { deleteAnnouncement } from "@/actions/announcement";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteAnnouncementButtonProps {
  id: string;
  title: string;
}

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <AlertDialogAction
      type="submit"
      disabled={pending}
      className="bg-red-600 hover:bg-red-700"
    >
      {pending ? "Deleting..." : "Delete"}
    </AlertDialogAction>
  );
}

export default function DeleteAnnouncementButton({
  id,
  title,
}: DeleteAnnouncementButtonProps) {
  const deleteAction = deleteAnnouncement.bind(null, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 flex items-center gap-2 cursor-pointer">
        <Trash2 size={16} />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Announcement</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus announcement{" "}
            <span className="font-semibold">"{title}"</span>?
            <br />
            <br />
            Tindakan ini tidak bisa dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form
            action={async () => {
              const result = await deleteAnnouncement(id);
              if (result && !result.success) {
                alert(result.message);
              }
            }}
          >
            <DeleteSubmitButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
