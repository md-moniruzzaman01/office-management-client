export const Header = () => {
  const cards = [
    { label: "Total Users", count: "1,250", trend: "+12%", color: "blue" },
    { label: "Holidays", count: "8", trend: "Upcoming", color: "purple" },
    { label: "Events", count: "12", trend: "This Month", color: "pink" },
    { label: "Payroll", count: "$142k", trend: "Processed", color: "emerald" },
    { label: "Accounts", count: "4", trend: "Active", color: "amber" },
    { label: "Reports", count: "24", trend: "Generated", color: "indigo" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="group p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-${card.color}-50 text-${card.color}-600`}>
              {card.trend}
            </span>
          </div>
          <p className="text-2xl font-black text-slate-800 tracking-tight">{card.count}</p>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
};