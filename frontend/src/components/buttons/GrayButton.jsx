const GrayButton = ({title}) => {
  return (
    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm border border-white/10 shadow-lg hover:bg-slate-800 hover:border-amber-400/40 hover:scale-105 transition-all duration-300 focus:outline-none">
    {title}
    </button>
  );
};

export default GrayButton;
