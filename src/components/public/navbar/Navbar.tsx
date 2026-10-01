import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileNavbar";
import { PublicMosque } from "@/types/public";
import { menus } from "@/constant/navigation";

interface NavbarProps {
  mosqueProfile: PublicMosque | null;
}

export default function Navbar({ mosqueProfile }: NavbarProps) {
  const mosqueName = mosqueProfile?.mosqueName ?? "Masjid";
  const logoURL = mosqueProfile?.logoURL;

  return (
    <header className="sticky top-0 z-50 border-b bg-[#F8F5EF]/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {logoURL ? (
            <Image
              src={logoURL}
              alt={`Logo ${mosqueName}`}
              width={48}
              height={48}
              className="shrink-0 rounded-full object-cover"
            />
          ) : null}

          <div>
            <h1 className="font-heading text-xl font-semibold text-[#184D3B]">
              {mosqueName}
            </h1>

            <p className="text-[0.5rem] uppercase tracking-widest text-[#C69A49]">
              Portal Resmi Masjid
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden gap-8 lg:flex">
          {menus.map((menu) => (
            <Link key={menu.href} href={menu.href}>
              {menu.label}
            </Link>
          ))}
        </nav>

        {/* Mobile */}
        <MobileMenu menus={menus} />
      </div>
    </header>
  );
}
