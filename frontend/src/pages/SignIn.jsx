import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (!formData.email && !formData.password) {
      alert("please fill the details");
    } else {
      try {
        const data = await axios.post("http://127.0.0.1:8000/api/auth/login/",formData);
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
            <h2 className="text-3xl font-bold text-white">Sign In</h2>
            <p className="text-slate-400 mt-2">Welcome back to your account</p>
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

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-amber-400 hover:text-amber-300 transition"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            Sign In
          </button>

          <p className="text-center text-slate-400 text-sm">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-amber-400 font-medium hover:text-amber-300 transition"
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </>
  );
};
export default SignIn;
