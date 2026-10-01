import Link from "next/link";
import { Play } from "lucide-react";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
}

export function PrimaryButton({
  href = "#",
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl bg-[#C69A49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b58c3e]"
    >
      {children}
    </Link>
  );
}

export function OutlineButton({
  href = "#",
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
    >
      <Play size={16} fill="white" />
      {children}
    </Link>
  );
}