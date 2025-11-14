"use client";

import Image from "next/image";
import { TweetMedia as TMedia } from "@/types/tweet";

interface TweetMediaProps {
  media: TMedia[];
}

export default function TweetMedia({ media }: Readonly<TweetMediaProps>) {
  if (!media || media.length === 0) return null;

  return (
    <div className="mt-3 grid gap-2 rounded-xl overflow-hidden">
      {media.length === 1 && <MediaItem item={media[0]} />}

      {media.length > 1 && (
        <div className="grid grid-cols-2 gap-2">
          {media.map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function MediaItem({ item }: { item: TMedia }) {
  if (item.type === "image") {
    return (
      <div className="relative w-full h-64">
        <Image
          src={item.url}
          alt="Tweet media"
          fill
          className="object-cover rounded-xl"
        />
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <video src={item.url} controls className="rounded-xl w-full max-h-96" />
    );
  }

  return null;
}
