const stats = [
  { label: "Active Jobs", value: "500+" },
  { label: "Companies Hiring", value: "120+" },
  { label: "Remote Roles", value: "60%" },
  { label: "Placed Engineers", value: "2,400+" },
];

export default function StatsBar({ total }: { total: number }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.04]">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#0a0a0f] px-6 py-5 text-center">
            <p className="text-2xl font-extrabold gradient-text">{i === 0 ? `${total}+` : s.value}</p>
            <p className="text-white/30 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
