"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateProfile } from "@/actions/setting";

import { profileSchema } from "@/validations/setting";
import { ProfileFormValues } from "@/types/setting";

interface ProfileFormProps {
  initialValues: ProfileFormValues;
}

export default function ProfileForm({ initialValues }: ProfileFormProps) {
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  const submitHandler = (values: ProfileFormValues) => {
    startTransition(async () => {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);

      const result = await updateProfile(formData);

      if (result?.success === false) {
        toast.error(result.message);
        return;
      }

      toast.success("Profile updated successfully.");
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Profile Information
        </h2>

        <p className="text-sm text-gray-500">
          Ubah nama dan email administrator.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Name
        </label>

        <input
          {...register("name")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          {...register("email")}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Update Profile"}
      </button>
    </form>
  );
}
