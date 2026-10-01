import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Image
              src="/icon.png"
              alt="logo"
              width={100}
              height={50}
              priority
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Login Admin</h1>

        
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
