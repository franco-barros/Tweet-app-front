"use client";

import { Tweet } from "../tweet";
import { Tweet as TweetType } from "../../../types/tweet";

export default function Feed() {
  const tweets: TweetType[] = [
    {
      id: "1",
      user: {
        id: "u1",
        name: "Elon Musk",
        username: "elonmusk",
        avatar: "/elon.jpg",
      },
      content: "Starship flight test successful 🚀",
      createdAt: "2025-02-01T10:00:00Z",
      media: [],
      stats: {
        likes: 120000,
        retweets: 45000,
        replies: 5500,
      },
      isLiked: false,
      isRetweeted: false,
    },
    {
      id: "2",
      user: {
        id: "u2",
        name: "Fran Barros",
        username: "fran_barros",
        avatar: "/fran.jpg",
      },
      content: "Construyendo un clon de Twitter con Next.js 💻",
      createdAt: "2025-02-01T12:00:00Z",
      media: [],
      stats: {
        likes: 150,
        retweets: 30,
        replies: 5,
      },
      isLiked: false,
      isRetweeted: false,
    },
  ];

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} data={tweet} />
      ))}
    </div>
  );
}
