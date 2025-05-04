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
import { onAuthStateChanged } from "firebase/auth";

dayjs.extend(relativeTime);

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [userMsg, setMsg] = useState("");
  const [userName, setName] = useState("");

  useEffect(() => {
    let state = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
        } else {
          navigate("/");
        }
      });
    };
    state();
  }, []);

  useEffect(() => {
    getdata();
    getusername();
  }, []);

  let getusername = async () => {
    const querySnapshot = await getDocs(collection(db, "username"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.data().username)
      setName(doc.data().username);
    });
  };

  const getdata = async () => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    const chatData = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      chatData.push(doc.data());
    });
    setChats(chatData);
  };

  const sendmsg = async () => {
    if (!userMsg.trim()) return;
    await addDoc(collection(db, "chats"), {
      msg: userMsg,
      Name: userName,
      createdAt: Date.now(),
    });
    setMsg("");
    getdata();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      {/* Chat header */}
      <div className="text-center text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
        💬 ChatZone Dark
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-2">
        {chats.map((itm, idx) => {
          const isMyMsg = itm.Name === userName; // yeh line fix ki gayi hai

          return (
            <div
              key={idx}
              className={`max-w-[70%] p-3 rounded-xl shadow-lg ${
                isMyMsg
                  ? "bg-indigo-600 text-white ml-auto text-right"
                  : "bg-gray-700 text-white mr-auto text-left"
              }`}
            >
              <p className="text-sm font-semibold">{itm.Name}</p>
              <p className="break-words">{itm.msg}</p>
              <p className="text-xs text-gray-300 mt-1">
                {dayjs(itm.createdAt).fromNow()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Message input */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMsg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 p-3 rounded-full outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={sendmsg}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
