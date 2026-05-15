import { useState, useEffect } from "react";
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
  Upload,
} from "lucide-react";
import Loader from "../components/others/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const ChatBox = () => {
  const [showLoader, setLoader] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    sender: "",
  });
  const [textData, setTextData] = useState({
    file: "",
  });
  const [chatHistory, setChatHistory] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [documentReady, setDocumentReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [line, setLine] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const conversation_id = localStorage.getItem("conversation_id");
  const file_obj_id = localStorage.getItem("file_obj_id");
  const username = localStorage.getItem("username");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "file") {
      setTextData({ ...textData, file: e.target.files[0] });
      setDocumentReady(true);
    }
  };
  // send form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.sender) {
      alert("Please enter the message !");
      return;
    } else {
      const data = new FormData();
      try {
        if (!conversation_id) {
          data.append("sender", formData.sender);
          data.append("file_obj_id",file_obj_id)
        } else {
          data.append("sender", formData.sender);
          data.append("conversation_id", conversation_id);
        }

        setChatHistory((prev) => [
          ...prev,
          {
            sender: "user",
            message: formData.sender,
          },
        ]);

        setFormData({
          sender: "",
        });
        const response = await axios.post(
          "http://127.0.0.1:8000/api/chats/user_input/",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );

        setChatHistory((prev) => [
          ...prev,
          {
            sender: "bot",
            message: response.data.bot_response,
          },
        ]);
        if (!conversation_id) {
          localStorage.setItem(
            "conversation_id",
            response.data.conversation_id,
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // get's user chats history
  const fetchData = async (id = conversation_id) => {
    if (!id) {
      return;
    } else {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/chats/get_chats/",

          {
            params: {
              conversation_id: id,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        const chats = response.data.conversation_list;
        const formattedMessages = chats
          .map((item) => [
            {
              sender: "user",
              message: item.sender,
            },
            {
              sender: "bot",
              message: item.bot,
            },
          ])
          .flat();
        setChatHistory(formattedMessages);
        setFileName(response.data.file_name)
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  // get's user conversations history
  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/chats/get_conversations/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setConversations(response.data.all_conversation_list);
    } catch (error) {
      console.log(error);
    }
  };
  // send file data to backend
  const handelFileSubmit = async (e) => {
    e.preventDefault();
    if (!textData.file) {
      alert("upload a file !");
      return;
    } else {
      const formFileData = new FormData();
      if (textData.file) {
        formFileData.append("file", textData.file);
      }
      try {
        setLine(true);
        setIsProcessing(true);
        const response = await axios.post(
          "http://127.0.0.1:8000/api/extractor/extract_text/",
          formFileData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        setIsProcessing(false);
        localStorage.setItem("file_obj_id", response.data.file_obj_id);
        alert("document processed successfully !");
        return;
      } catch (error) {
        console.log(error);
        alert("document processing failed !");
      }
    }
  };

  const clearConversationId = () => {
    setFormData({ sender: "" });
    setFileName("")
    localStorage.removeItem("conversation_id");
    localStorage.removeItem("file_obj_id");
    setChatHistory([]);
    showLoader(true)
    redirect("/chat")
  };

  const redirect = (url) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate(url);
    }, 1500);
  };

  useEffect(() => {
    fetchConversations();
    fetchData();
  }, []);
  return (
    <>
      {showLoader && <Loader />}

      {!showLoader && (
        <div className="h-screen bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 text-white flex overflow-hidden font-[Inter] ">
          <motion.aside
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="hidden md:flex w-80 border-r border-white/10 bg-slate-950 flex-col"
          >
            <div className="p-5 border-b border-white/10 sticky top-0 bg-slate-950 z-10">
              <h1 className="text-2xl font-bold text-white mb-3">
                Chat History
              </h1>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-amber-400 hover:bg-amber-300 text-black font-semibold py-3 rounded-2xl"
                onClick={() => clearConversationId()}
              >
                + New Conversation
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4  no-scrollbar">
              {conversations.map((chat) => (
                <motion.div
                  key={chat.id}
                  onClick={() => {
                    localStorage.setItem("conversation_id", chat.id);
                    fetchData(chat.id);
                    setDocumentReady(true)
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 4,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 rounded-3xl p-4 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-white font-semibold text-lg line-clamp-1">
                        {chat.document}
                      </h2>
                    </div>

                    <div className="w-3 h-3 rounded-full bg-amber-400 mt-2 opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-slate-500">
                      {chat.created_at}
                    </span>

                    <button className="text-xs bg-amber-400 text-black px-3 py-1 rounded-xl font-medium">
                      Open
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="pl-4 pb-4 border-t border-white/10">
              {" "}
              <a onClick={() => redirect("/profile")}>
                <div className="pt-3 pl-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold capitalize">
                    {username.split("@")[0][0]}
                  </div>
                  <div>
                    <p className="font-medium">{username.split("@")[0]}</p>
                    <p className="text-xs text-slate-400">{}</p>
                  </div>
                </div>
              </a>
            </div>
          </motion.aside>

          <div className="flex-1 flex flex-col">
            <motion.header
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative h-16 border-b border-white/10 px-6 flex items-center justify-between bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 backdrop-blur"
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
              <div
                className={`md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] overflow-y-auto  no-scrollbar transition-all duration-300 z-50 border-b border-white/50 ${
                  mobileMenu
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="px-6 pb-6 pt-2 bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-t border-white/10">
                  <nav className="flex flex-col gap-4  text-slate-300">
                    <div className="p-5 border-b border-white/10 sticky top-0 bg-slate-950 z-10">
                      <h1 className="text-2xl font-bold text-white mb-3">
                        Chat History
                      </h1>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-amber-400 hover:bg-amber-300 text-black font-semibold py-3 rounded-2xl"
                        onClick={() => clearConversationId()}
                      >
                        + New Conversation
                      </motion.button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                      {conversations.map((chat) => (
                        <motion.div
                          key={chat.id}
                          onClick={() => {
                            localStorage.setItem("conversation_id", chat.id);
                            fetchData(chat.id);
                          }}
                          whileHover={{
                            scale: 1.02,
                            x: 4,
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="group bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 rounded-3xl p-4 cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h2 className="text-white font-semibold text-lg line-clamp-1">
                                Document {chat.id}
                              </h2>

                              <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                                {chat.bot}
                              </p>
                            </div>

                            <div className="w-3 h-3 rounded-full bg-amber-400 mt-2 opacity-0 group-hover:opacity-100 transition" />
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xs text-slate-500">
                              {chat.created_at}
                            </span>

                            <button className="text-xs bg-amber-400 text-black px-3 py-1 rounded-xl font-medium">
                              Open
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="pl-4 pb-4 border-t border-white/10">
                      {" "}
                      <a onClick={() => redirect("/profile")}>
                        <div className="pt-3 pl-6 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold capitalize">
                            {username.split("@")[0][0]}
                          </div>
                          <div>
                            <p className="font-medium">
                              {username.split("@")[0]}
                            </p>
                            <p className="text-xs text-slate-400">{}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </motion.header>

            {!mobileMenu && (
              <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar">
                <div className="max-w-4xl mx-auto space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-5 h-5 text-amber-400" />
                      <span className="text-sm text-slate-400">
                        Legal Next AI
                      </span>
                    </div>

                    <div className="bg-white text-black max-w-xl rounded-3xl rounded-tl-md p-5">
                      <div className="mb-5">
                        Please upload the document and I’ll begin the risk
                        assessment immediately.
                      </div>
                      <motion.label
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 border border-slate-950 px-3 py-2 rounded-xl cursor-pointer w-fit"
                      >
                        <Paperclip className="w-5 h-5 text-slate-950" />

                        <span className="text-sm text-slate-950">
                          {textData.file
                            ? textData.file.name
                            : fileName
                              ? fileName.file.split("/").pop()
                              : "Choose File"}
                        </span>
                         {!fileName && (<>
                         <form onSubmit={handelFileSubmit}>
                          <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                         <motion.button
                            type="submit"
                            whileHover={{ scale: 1.1 }}
                            className="bg-slate-950 text-gray-300 p-3 rounded-2xl"
                          >
                            <Upload className="w-4 h-4" />
                          </motion.button>
                        </form></>)}
                      </motion.label>
                      {line && (
                        <div className="mt-4">
                          <span className="text-sm text-slate-950">
                            {isProcessing
                              ? "Processing document..."
                              : "Ready for chat"}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <div className="space-y-6">
                    {chatHistory.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          y: 20,
                          scale: 0.95,
                          x: msg.sender === "user" ? 60 : -60,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          x: 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 14,
                          delay: index * 0.05,
                        }}
                        whileHover={{
                          scale: 1.01,
                        }}
                        className={`flex ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className={`max-w-2xl rounded-3xl p-5 shadow-xl backdrop-blur-sm ${
                            msg.sender === "user"
                              ? "bg-white/10 border border-white/10 text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          {msg.sender === "bot" && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                              className="flex items-center gap-2 mb-2"
                            >
                              <Bot className="w-5 h-5 text-amber-400" />

                              <span className="text-sm text-slate-400">
                                Legal Next AI
                              </span>
                            </motion.div>
                          )}

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="leading-relaxed"
                          >
                            {msg.message}
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    ))}

                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white text-black rounded-3xl p-4 flex gap-2">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                            }}
                            className="w-2 h-2 bg-black rounded-full"
                          />

                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: 0.1,
                            }}
                            className="w-2 h-2 bg-black rounded-full"
                          />

                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: 0.2,
                            }}
                            className="w-2 h-2 bg-black rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <motion.footer
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-t border-white/10 p-6 bg-slate-950"
            >
              <form onSubmit={handleSubmit}>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 border border-white/10 rounded-3xl px-4 py-3">
                    <input
                      disabled={!documentReady}
                      type="text"
                      name="sender"
                      value={formData.sender}
                      onChange={handleChange}
                      placeholder={
                        documentReady
                          ? "Ask a legal question..."
                          : "Upload a document first..."
                      }
                      className="flex-1 bg-transparent outline-none"
                    />

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-amber-400 text-black p-3 rounded-2xl"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
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
