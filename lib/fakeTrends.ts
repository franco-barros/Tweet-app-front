export interface Trend {
  id: string;
  topic: string;
  tweets: string;
}

export const fakeTrends: Trend[] = [
  { id: "trend-1", topic: "#NextJS", tweets: "10.5K" },
  { id: "trend-2", topic: "#AI", tweets: "20.2K" },
  { id: "trend-3", topic: "#OpenSource", tweets: "8.9K" },
];
