import {
  ShieldCheck,
  FileText,
  ArrowRight,
  CheckCircle2,
  Mail,
  Share2,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-slate-400 font-[Inter]">
          <p>© 2026 Legal Next. All rights reserved.</p>
          <div className="flex gap-4">
            <Mail />
            <Share2 />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
