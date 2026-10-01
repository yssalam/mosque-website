interface AccountCardProps {
  admin: {
    name: string;
    email: string;
    role: string;
    createdAt: Date;
  };
}

export default function AccountCard({ admin }: AccountCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
          {admin.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">{admin.name}</h2>

          <p className="text-gray-500">{admin.email}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Role</p>

          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            {admin.role}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Created At</p>

          <p className="font-medium text-gray-700">
            {admin.createdAt.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
