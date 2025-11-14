export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface TweetMedia {
  id: string;
  type: "image" | "video";
  url: string;
}

export interface Tweet {
  id: string;
  user: User;
  content: string;
  createdAt: string;
  media?: TweetMedia[];
  stats: {
    likes: number;
    retweets: number;
    replies: number;
  };
  isLiked?: boolean;
  isRetweeted?: boolean;
}
