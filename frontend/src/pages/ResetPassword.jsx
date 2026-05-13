import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";

const ResetPassword = () => {
  const [showLoader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.new_password && !confirmPassword) {
      alert("please fill the details !");
      return;
    }
    if (formData.new_password !== confirmPassword) {
      alert("password doesn't match !");
      return;
    } else {
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/auth/reset_password/",
          formData,
        );

        setFormData({
          password: "",
        });
        setConfirmPassword("");

        alert("password reset successfully !");
        return;
      } catch (error) {
        console.log(error);
        alert("password reset failed !");
        return;
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 px-4 overflow-hidden font-[Inter]">
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
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white"
            >
              Reset Password
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-5 py-3  rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-5 py-3 mb-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            Submit
          </motion.button>
        </motion.form>
      </div>
    </>
  );
};

export default ResetPassword;
