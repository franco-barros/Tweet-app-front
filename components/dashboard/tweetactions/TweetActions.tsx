"use client";

import { Tweet } from "@/types/tweet";
import { FaRegComment, FaRetweet, FaHeart } from "react-icons/fa";

interface TweetActionsProps {
  tweet: Tweet;
  onLike?: (id: string) => void;
  onRetweet?: (id: string) => void;
  onReply?: (id: string) => void;
}

export default function TweetActions({
  tweet,
  onLike,
  onRetweet,
  onReply,
}: Readonly<TweetActionsProps>) {
  return (
    <div className="flex gap-6 text-gray-500 mt-3 select-none">
      {/* Reply */}
      <button
        onClick={() => onReply?.(tweet.id)}
        className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer"
      >
        <FaRegComment size={16} />
        <span>{tweet.stats.replies}</span>
      </button>

      {/* Retweet */}
      <button
        onClick={() => onRetweet?.(tweet.id)}
        className={`flex items-center gap-1 transition ${
          tweet.isRetweeted
            ? "text-green-500"
            : "hover:text-green-500 cursor-pointer"
        }`}
      >
        <FaRetweet size={16} />
        <span>{tweet.stats.retweets}</span>
      </button>

      {/* Like */}
      <button
        onClick={() => onLike?.(tweet.id)}
        className={`flex items-center gap-1 transition cursor-pointer ${
          tweet.isLiked ? "text-red-500" : "hover:text-red-500"
        }`}
      >
        <FaHeart
          size={16}
          className={tweet.isLiked ? "fill-red-500 text-red-500" : ""}
        />
        <span>{tweet.stats.likes}</span>
      </button>
    </div>
  );
}
