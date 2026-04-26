const YellowButton = ({title}) => {
  return (
    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 hover:bg-amber-300 hover:shadow-amber-400/40 hover:scale-105 transition-all duration-300 focus:outline-none">
    {title}
    </button>
  );
};

export default YellowButton;
