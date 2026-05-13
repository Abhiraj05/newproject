import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import NavBar from "../components/others/NavBar";
import Footer from "../components/others/Footer";
import Loader from "../components/others/Loader";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "../App.css";

const Contact = () => {
  const navigate = useNavigate();
  const [showLoader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name && !formData.email && !formData.message) {
      alert("please fill the details !");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/feedback/send_feedback/",
          formData,
        );
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setConfirmPassword("");

        alert("feedback submitted successfully !");
        return;
      } catch (error) {
        console.log(error);
        alert("feedback submission failed !");
        return;
      }
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
        <div className="min-h-screen bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 text-white font-[Inter]">
          <NavBar navigate={redirect} />

          <main className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
              }}
              className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-md sm:h-112 bg-amber-400/10 blur-3xl rounded-full"
            />

            <section className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <span className="inline-flex px-4 py-2 rounded-full bg-amber-400/10 text-amber-300 text-sm mb-6">
                  Contact Us
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Let’s Talk About Your Legal Needs
                </h1>

                <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                  Have questions, feedback, or need assistance? Reach out to our
                  team and we’ll get back to you as soon as possible.
                </p>

                <div className="mt-10 space-y-6">
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 justify-center lg:justify-start"
                  >
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <Mail className="text-amber-400 w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm">Email</p>
                      <p className="font-medium break-all">
                        support@legalnext.com
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 justify-center lg:justify-start"
                  >
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <Phone className="text-amber-400 w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm">Phone</p>
                      <p className="font-medium">+91 98765 43210</p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 justify-center lg:justify-start"
                  >
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <MapPin className="text-amber-400 w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm">Location</p>
                      <p className="font-medium">Goa, India</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
              >
                <div className="mb-6 sm:text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Send Feedback
                  </h2>

                  <p className="text-slate-400 mt-2 text-sm sm:text-base">
                    We value your feedback and suggestions.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-4 sm:px-5 py-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full px-4 sm:px-5 py-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <textarea
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your feedback..."
                      className="w-full px-4 sm:px-5 py-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    ></textarea>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/20"
                  >
                    <Send className="w-4 h-4" />
                    Send Feedback
                  </motion.button>
                </form>
              </motion.div>
            </section>
          </main>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Contact;
