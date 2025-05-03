import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Auth/config";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess("Logged in successfully!");
        setTimeout(() => navigate("/chat"), 1000);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] via-[#302b63] to-[#24243e] px-4 py-10 animate-fade-in">
      <div className="w-full max-w-md bg-base-300 p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-base-100 transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-center text-white mb-10 drop-shadow-md">Login</h2>

        {error && (
          <div className="text-red-400 text-sm mb-4 text-center animate-pulse">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-400 text-sm mb-4 text-center animate-bounce">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center justify-center">
          {/* Email */}
          <label className="input input-bordered flex items-center gap-3 bg-base-100 text-white w-full">
            <svg
              className="w-5 h-5 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <input
              type="email"
              className="grow bg-transparent text-sm placeholder:text-white/50"
              placeholder="mail@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {/* Password */}
          <label className="input input-bordered flex items-center gap-3 bg-base-100 text-white w-full">
            <svg
              className="w-5 h-5 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 17v0M5 11h14M12 7v6" />
            </svg>
            <input
              type="password"
              className="grow bg-transparent text-sm placeholder:text-white/50"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2 shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Log In
          </button>
        </form>

        {/* Sign Up link */}
        <p className="text-center text-white/80 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/sign" className="text-pink-300 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
