import { getCurrentAdmin } from "@/lib/session";

import ProfileForm from "@/components/settings/ProfileForm";
import PasswordForm from "@/components/settings/PasswordForm";
import AccountCard from "@/components/settings/AccountCard";

export default async function SettingsPage() {
  const admin = await getCurrentAdmin();

  return (
    <main className="max-w-4xl mx-auto space-y-8 md:p-6">
      <div className="px-2">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

        <p className="text-gray-600">
          Kelola akun administrator CMS Masjid.
        </p>
      </div>

      <AccountCard admin={admin} />

      <ProfileForm
        initialValues={{
          name: admin.name,
          email: admin.email,
        }}
      />

      <PasswordForm />
    </main>
  );
}