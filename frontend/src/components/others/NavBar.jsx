import { useState } from "react";
import { Scale, Menu, X } from "lucide-react";
import GrayButton from "../buttons/GrayButton";
import Logo from "../../assets/image.png";

const Navbar = ({ navigate }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-linear-to-l from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-[Inter]">
          <a href="/">
            <div className="flex items-center gap-3 font-semibold text-xl">
              <img className="w-35" src={Logo} alt="" />
            </div>
          </a>
          <nav className="hidden md:flex gap-8 text-md text-slate-300">
            <a href="/">Home</a>
            <a onClick={() => navigate("/chat")}>Chat</a>
            <a onClick={() => navigate("/lawyers")}>Lawyers</a>
            <a onClick={() => navigate("/about")}>About</a>
            <a onClick={() => navigate("/contact")}>Contact</a>
          </nav>
          <div className="hidden md:block">
            <a onClick={() => navigate("/signin")}>
              <GrayButton className="rounded-2xl" title={"Log in"}></GrayButton>
            </a>
          </div>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10"
          >
            {mobileMenu ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>


        <div
          className={`md:hidden fixed top-16 left-0 w-full overflow-hidden transition-all duration-300 z-50 ${
            mobileMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 pt-2 bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-t border-white/10">
            <nav className="flex flex-col gap-4  text-slate-300">
              <a href="/" className="py-2 hover:text-amber-400 transition">
                Home
              </a>

              <a
                onClick={() => navigate("/chat")}
                className="py-2 hover:text-amber-400 transition cursor-pointer"
              >
                Chat
              </a>

              <a
                onClick={() => navigate("/lawyers")}
                className="py-2 hover:text-amber-400 transition cursor-pointer"
              >
                Lawyers
              </a>

              <a
                onClick={() => navigate("/about")}
                className="py-2 hover:text-amber-400 transition cursor-pointer"
              >
                About
              </a>

              <a
                onClick={() => navigate("/contact")}
                className="py-2 hover:text-amber-400 transition cursor-pointer"
              >
                Contact
              </a>

              <div className="pt-4">
                <a onClick={() => navigate("/signin")}>
                  <GrayButton className="w-full rounded-2xl" title={"Log in"} />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
