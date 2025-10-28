"use client";

import { useState } from "react";

export default function TweetComposer() {
  const [tweet, setTweet] = useState("");

  const handlePost = () => {
    if (!tweet.trim()) return;
    console.log("Tweet enviado:", tweet);
    setTweet("");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        placeholder="¿Qué está pasando?"
        className="w-full bg-transparent text-gray-800 dark:text-gray-100 resize-none outline-none min-h-20"
      />
      <div className="flex justify-end mt-3">
        <button
          onClick={handlePost}
          disabled={!tweet.trim()}
          className="bg-sky-500 text-white px-4 py-2 rounded-full hover:bg-sky-600 disabled:opacity-50 cursor-pointer"
        >
          Twittear
        </button>
      </div>
    </div>
  );
}
