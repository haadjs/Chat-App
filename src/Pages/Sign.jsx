import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Auth/config";
import { useNavigate, Link } from "react-router-dom";

const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/log"), 1000);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 px-4 animate-fade-in dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 transition-all duration-300 hover:scale-[1.02] dark:bg-gray-800">
        <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-400 text-center text-sm mb-4 animate-pulse">{error}</p>
        )}
        {success && (
          <p className="text-green-400 text-center text-sm mb-4 animate-bounce">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-primary w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-primary w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered input-primary w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full py-3 font-medium shadow-md transition-all duration-300 transform hover:scale-105 dark:bg-pink-500 dark:hover:bg-pink-600"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-white/80 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/log" className="text-pink-300 hover:underline font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sign;
