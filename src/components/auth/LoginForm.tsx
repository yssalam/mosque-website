"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { loginAdmin } from "@/actions/auth";

const initialState = {
  success: false,
  message: "",
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Signing in..." : "Login"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAdmin, initialState);

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Email</label>

        <input
          name="email"
          type="email"
          placeholder="admin@mail.com"
          className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Password</label>

        <input
          name="password"
          type="password"
          placeholder="********"
          className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <LoginButton />
    </form>
  );
}
