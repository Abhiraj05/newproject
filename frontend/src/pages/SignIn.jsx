import { useState } from "react";
import Loader from "../components/others/Loader";
import { motion } from "motion/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [showLoader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email && !formData.password) {
      alert("Please fill the details");
    } else {
      try {
        await axios.post("http://127.0.0.1:8000/api/auth/login/", formData);

        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.log(error);
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
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
            }}
            className="absolute w-96 h-96 bg-amber-400/20 blur-3xl rounded-full"
          />

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl space-y-5 z-10"
          >
            <div className="text-center mb-2">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white"
              >
                Sign In
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 mt-2"
              >
                Welcome back to your account
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-5 py-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-right"
            >
              <a
                href="#"
                className="text-sm text-amber-400 hover:text-amber-300 transition"
              >
                Forgot Password?
              </a>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/20"
            >
              Sign In
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-slate-400 text-sm"
            >
              Don’t have an account?{" "}
              <a
                onClick={() => redirect("/signup")}
                className="text-amber-400 font-medium hover:text-amber-300 transition"
              >
                Sign Up
              </a>
            </motion.p>
          </motion.form>
        </div>
      )}
    </>
  );
};

export default SignIn;
