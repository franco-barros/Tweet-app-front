"use client";

import { DashboardHeader } from "./dashboardheader";
import { TweetComposer } from "../ui/tweetcomposer";
import { Feed } from "./feed";
import { TrendsPanel } from "./trendspanel";
import { SuggestionsPanel } from "./suggestionspanel";

export default function Dashboard() {
  const userName = "fran_barros";

  const handlePost = (tweet: string) => {
    console.log("Nuevo tweet:", tweet);
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <DashboardHeader name={userName} />

      {/* ⬇️ ahora sí pasamos onPost */}
      <TweetComposer onPost={handlePost} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Feed />
        </div>

        <div className="space-y-6">
          <TrendsPanel />
          <SuggestionsPanel />
        </div>
      </div>
    </div>
  );
}
