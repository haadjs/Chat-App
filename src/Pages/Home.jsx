import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../Auth/config";

const Home = () => {
  let navigate = useNavigate();

  useEffect(() => {
    let state = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
          navigate("/chat");
        } else {
        }
      });
    };
    state()
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white px-6">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Welcome to ChatZone 💬
        </h1>
        <p className="text-xl opacity-90">
          Connect, chat, and share in real time. Your conversations, simplified
          and secured.
        </p>
        <button
          onClick={() => navigate("/log")}
          className="mt-4 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
