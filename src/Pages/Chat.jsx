import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../Auth/config";
import { auth } from "../Auth/config";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [userMsg, setMsg] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUsername(user.uid);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getUsername = async (uid) => {
    const querySnapshot = await getDocs(collection(db, "username"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.uid === uid) {
        setUserName(data.username || "Anonymous");
      }
    });
  };

  const getData = async () => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    const chatData = [];
    querySnapshot.forEach((doc) => {
      chatData.push(doc.data());
    });
    setChats(chatData);
  };

  const sendMsg = async () => {
    if (!userMsg.trim()) return;
    await addDoc(collection(db, "chats"), {
      msg: userMsg,
      name: userName,
      createdAt: Date.now(),
    });
    setMsg("");
    getData();
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      {/* Chat Header */}
      <div className="flex justify-between text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
        <p>💬 ChatZone Dark</p>
        <button onClick={logout} className="text-red-400 hover:underline">
          Logout
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-2">
        {chats.map((itm, idx) => {
          const isMyMsg = itm.name === userName;

          return (
            <div
              key={idx}
              className={`max-w-[70%] p-3 rounded-xl shadow-lg ${
                isMyMsg
                  ? "bg-indigo-600 text-white ml-auto text-right" // right side
                  : "bg-gray-700 text-white mr-auto text-left" // left side
              }`}
            >
              <p className="text-sm font-semibold">{itm.name}</p>
              <p className="break-words">{itm.msg}</p>
              <p className="text-xs text-gray-300 mt-1">
                {dayjs(itm.createdAt).fromNow()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMsg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 p-3 rounded-full outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={sendMsg}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
