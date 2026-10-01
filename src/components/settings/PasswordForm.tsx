"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { changePassword } from "@/actions/setting";

import { passwordSchema } from "@/validations/setting";
import { PasswordFormValues } from "@/types/setting";

export default function PasswordForm() {
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const submitHandler = (values: PasswordFormValues) => {
    startTransition(async () => {
      const formData = new FormData();

      formData.append("currentPassword", values.currentPassword);
      formData.append("newPassword", values.newPassword);
      formData.append("confirmPassword", values.confirmPassword);

      const result = await changePassword(formData);

      if (result?.success === false) {
        toast.error(result.message);
        return;
      }

      toast.success("Password updated successfully.");
      reset();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>

        <p className="text-sm text-gray-500">
          Gunakan password minimal 8 karakter.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Current Password
        </label>

        <input
          type="password"
          {...register("currentPassword")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.currentPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          New Password
        </label>

        <input
          type="password"
          {...register("newPassword")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.newPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Confirm Password
        </label>

        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {pending ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
}
