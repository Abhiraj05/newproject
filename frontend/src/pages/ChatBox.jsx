import { motion } from "motion/react";
import {
  Scale,
  Menu,
  Search,
  Paperclip,
  FileText,
  Send,
  Bot,
} from "lucide-react";

const ChatBox = () => {
  return (
    <div className="h-screen bg-slate-950 text-white flex overflow-hidden">
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex w-72 border-r border-white/10 bg-slate-900 flex-col"
      >
        <div className="p-6 text-2xl font-bold border-b border-white/10">
          Chat History
        </div>

        <nav className="flex-1 p-4 space-y-2 text-slate-300">
          <motion.div
            whileHover={{ x: 5 }}
            className="px-4 py-3 rounded-2xl bg-white text-black font-semibold"
          >
            Case History
          </motion.div>

          {["Brief Analysis", "Documents", "Settings"].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="px-4 py-3 rounded-2xl hover:bg-white/5 cursor-pointer"
            >
              {item}
            </motion.div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
            JD
          </div>

          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-slate-400">Advocate</p>
          </div>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col">
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-slate-950/80 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <Menu className="md:hidden" />
            <Scale className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-semibold">Legal Next</h1>
          </div>

          <Search className="w-5 h-5 text-slate-400" />
        </motion.header>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* User */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-end"
            >
              <div className="bg-amber-400 text-black px-5 py-3 rounded-3xl rounded-br-md max-w-xl font-medium">
                Can you analyze the attached contract for risk factors?
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-amber-400" />
                <span className="text-sm text-slate-400">Law Mate AI</span>
              </div>

              <div className="bg-white text-black max-w-xl rounded-3xl rounded-tl-md p-5">
                Certainly. Please upload the document and I’ll begin the risk
                assessment immediately.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-end"
            >
              <div className="bg-white/10 border border-white/10 rounded-3xl p-4 max-w-xl">
                <div className="flex items-center gap-4">
                  <FileText className="w-10 h-10 text-amber-400" />
                  <div>
                    <p className="font-medium">Service_Agreement.pdf</p>
                    <p className="text-sm text-slate-400">1.4 MB</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-amber-400" />
                <span className="text-sm text-slate-400">Law Mate AI</span>
              </div>

              <div className="bg-white text-black max-w-2xl rounded-3xl rounded-tl-md p-6">
                <h3 className="text-xl font-bold mb-3">
                  Contract Risk Analysis
                </h3>

                <p className="text-slate-600 mb-5">
                  I found possible risk factors in Indemnification and
                  Termination clauses.
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">
                    Section 4.2
                  </span>

                  <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">
                    Section 9.1
                  </span>

                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Verified
                  </span>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2 rounded-xl bg-slate-200"
                  >
                    Dismiss
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2 rounded-xl bg-amber-400"
                  >
                    Detailed Breakdown
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.footer
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-t border-white/10 p-6 bg-slate-950"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-3xl px-4 py-3">
              <motion.button whileHover={{ scale: 1.1 }}>
                <Paperclip className="w-5 h-5 text-slate-400" />
              </motion.button>

              <input
                type="text"
                placeholder="Ask a legal question..."
                className="flex-1 bg-transparent outline-none"
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-amber-400 text-black p-3 rounded-2xl"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>Confidential Session</span>
              <span>AI Online</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default ChatBox;
