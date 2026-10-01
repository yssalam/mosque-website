import { prisma } from "@/lib/prisma";

function toWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

const linkClass =
  "inline-flex min-h-11 items-center break-words underline-offset-4 hover:underline";

export default async function Footer() {
  const profile = await prisma.mosqueProfile.findFirst();

  if (!profile) return null;

  const {
    mosqueName,
    description,
    address,
    phone,
    email,
    mapURL,
    logoURL,
    operationalHours,
  } = profile;

  return (
    <footer className="bg-[#0F3D33] text-[#EAF3EE]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 py-10 md:grid-cols-2 md:gap-10 md:px-6 md:py-14 lg:grid-cols-3">
        {/* Identitas */}
        <div className="md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            {logoURL ? (
              <img
                src={logoURL}
                alt={`Logo ${mosqueName}`}
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
            ) : null}
            <h2 className="text-lg font-bold md:text-xl">{mosqueName}</h2>
          </div>
          {description ? (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#C5D8CF]">
              {description}
            </p>
          ) : null}
        </div>

        {/* Kontak */}
        <div className="border-t border-[#EAF3EE]/15 pt-8 md:border-t-0 md:pt-0">
          <h3 className="text-base font-bold text-[#E0A64A] md:text-lg">
            Hubungi kami
          </h3>
          <ul className="mt-3 space-y-1 text-sm md:mt-4">
            {address ? (
              <li className="pb-2 leading-relaxed text-[#C5D8CF]">{address}</li>
            ) : null}
            {phone ? (
              <li>
                <a
                  href={toWhatsAppLink(phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {phone}
                </a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
            ) : null}
            {mapURL ? (
              <li>
                <a
                  href={mapURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} font-medium text-[#E0A64A]`}
                >
                  Buka peta
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        {/* Jam operasional */}
        <div className="border-t border-[#EAF3EE]/15 pt-8 md:border-t-0 md:pt-0">
          <h3 className="text-base font-bold text-[#E0A64A] md:text-lg">
            Jam operasional
          </h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#C5D8CF] md:mt-4">
            {operationalHours || "Belum diatur."}
          </p>
        </div>
      </div>

      {/* Bar bawah */}
      <div className="border-t border-[#EAF3EE]/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-center text-sm text-[#C5D8CF] sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <span>
            © {new Date().getFullYear()} {mosqueName}. Semua hak dilindungi.
          </span>
          <span lang="ar" className="text-lg text-[#E0A64A]">
            جَزَاكُمُ اللّٰهُ خَيْرًا
          </span>
        </div>
      </div>
    </footer>
  );
}
