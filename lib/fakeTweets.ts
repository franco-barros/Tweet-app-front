import { Tweet } from "../types/tweet";

export const fakeTweets: Tweet[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Elon Musk",
      username: "elonmusk",
      avatar: "/elon.jpg",
    },
    content: "Starship flight test successful 🚀",
    createdAt: "2025-01-11T10:00:00Z",
    media: [],
    stats: {
      likes: 120000,
      retweets: 45000,
      replies: 2,
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
    createdAt: "2025-01-11T12:30:00Z",
    media: [],
    stats: {
      likes: 150,
      retweets: 30,
      replies: 1,
    },
    isLiked: false,
    isRetweeted: false,
  },
];

// 🧵 Opcional: mapa de replies por tweet
export const fakeReplies: Record<string, Tweet[]> = {
  "1": [
    {
      id: "r1",
      user: {
        id: "u2",
        name: "Fran Barros",
        username: "fran_barros",
        avatar: "/fran.jpg",
      },
      content: "Increíble lo que están logrando 🚀🔥",
      createdAt: "2025-01-11T10:15:00Z",
      media: [],
      stats: { likes: 20, retweets: 2, replies: 0 },
    },
  ],

  "2": [
    {
      id: "r2",
      user: {
        id: "u3",
        name: "Next.js Team",
        username: "nextjs",
        avatar: "/nextjs.png",
      },
      content: "Eso suena genial, ¡seguí así! 💙",
      createdAt: "2025-01-11T12:45:00Z",
      media: [],
      stats: { likes: 40, retweets: 5, replies: 0 },
    },
  ],
};
