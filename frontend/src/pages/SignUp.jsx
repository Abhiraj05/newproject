import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!formData.email && !formData.password && !formData.password) {
      alert("please fill the details");
    }
    if (formData.password != confirmPassword) {
      alert("password doesnt match");
    } else {
      try {
        const data = await axios.post("http://127.0.0.1:8000/api/auth/register/",formData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="min-h-screen flex items-center justify-center bg-slate-950 px-4"
      >
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl space-y-5">
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-white">Sign Up</h2>
            <p className="text-slate-400 mt-2">Create your new account</p>
          </div>

          <div>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-5 py-3 rounded-2xl bg-slate-900 text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            Sign Up
          </button>

          <p className="text-center text-slate-400 text-sm">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-amber-400 font-medium hover:text-amber-300 transition"
            >
              Sign In
            </a>
          </p>
        </div>
      </form>
    </>
  );
};
export default SignUp;
