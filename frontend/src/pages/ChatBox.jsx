import { useState } from "react";
import { motion } from "motion/react";
import Logo from "../assets/image.png";
import {
  Scale,
  Menu,
  Search,
  Paperclip,
  FileText,
  Send,
  Bot,
  X,
} from "lucide-react";
import Loader from "../components/others/Loader";
import { useNavigate } from "react-router-dom";


const ChatBox = () => {
  const [showLoader, setLoader] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    userinput: "",
  });
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userinput) {
      alert("Please enter the message");
      return;
    } else {
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/chats/user_input/",
          formData,
        );
        fetchData();
        setFormData({
          userinput: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/chats/get_chats/",
      );
      setChatHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const redirect = (url) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate(url);
    }, 1500);
  };
  return (
    <>
      {showLoader && <Loader />}

      {!showLoader && (
        <div className="h-screen bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 text-white flex overflow-hidden font-[Inter]">
          <motion.aside
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="hidden md:flex w-72 border-r border-white/10 bg-linear-to-t from-slate-950 via-slate-900 to-slate-950 flex-col"
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

            <a onClick={() => navigate("/profile")}>
              <div className="p-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                  JD
                </div>

                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-slate-400">Advocate</p>
                </div>
              </div>
            </a>
          </motion.aside>

          <div className="flex-1 flex flex-col">
            <motion.header
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 backdrop-blur"
            >
              <div className="flex items-center gap-3">
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
                <div className="flex items-center gap-3 font-semibold text-xl">
                  <img className="w-35" src={Logo} alt="" />
                </div>
              </div>

              <Search className="w-5 h-5 text-slate-400" />
              <div
                className={`md:hidden fixed top-16 left-0 w-full overflow-hidden transition-all duration-300 z-50 border-b border-white/50 ${
                  mobileMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2 bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-t border-white/10">
                  <nav className="flex flex-col gap-4  text-slate-300">
                    <a href="" className="py-2 hover:text-amber-400 transition">
                      Chat History
                    </a>

                    <a
                      onClick={() => navigate("")}
                      className="py-2 hover:text-amber-400 transition cursor-pointer"
                    >
                      Case History
                    </a>

                    <a
                      onClick={() => navigate("")}
                      className="py-2 hover:text-amber-400 transition cursor-pointer"
                    >
                      Brief Analysis
                    </a>

                    <a
                      onClick={() => navigate("=")}
                      className="py-2 hover:text-amber-400 transition cursor-pointer"
                    >
                      Documents
                    </a>

                    <a
                      onClick={() => redirect("/contact")}
                      className="py-2 hover:text-amber-400 transition cursor-pointer"
                    >
                      Settings
                    </a>
                    <a onClick={() => redirect("/profile")}>
                      <div className="pt-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                          JD
                        </div>

                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-slate-400">Advocate</p>
                        </div>
                      </div>
                    </a>
                  </nav>
                </div>
              </div>
            </motion.header>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="max-w-4xl mx-auto space-y-8">
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
                    Certainly. Please upload the document and I’ll begin the
                    risk assessment immediately.
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
              <form onSubmit={handleSubmit}>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 border border-white/10 rounded-3xl px-4 py-3">
                    <motion.button whileHover={{ scale: 1.1 }}>
                      <Paperclip className="w-5 h-5 text-slate-400" />
                    </motion.button>

                    <input
                      type="text"
                      name="userinput"
                      value={formData.userinput}
                      onChange={handleChange}
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
              </form>
            </motion.footer>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
