interface PrayerCardProps {
  name: string;
  time: string;
}

export default function PrayerCard({ name, time }: PrayerCardProps) {
  return (
    <div className="group rounded-3xl bg-[#184D3B] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-[#C69A49]" />

      <p className="text-sm uppercase tracking-[0.25em] text-[#DCC48A]">
        {name}
      </p>

      <h3 className="mt-4 text-4xl font-bold text-white">{time}</h3>

      <p className="mt-2 text-xs text-emerald-100">Waktu Shalat</p>
    </div>
  );
}