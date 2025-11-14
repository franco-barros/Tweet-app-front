"use client";

import { Tweet as TweetType } from "@/types/tweet";
import { UserAvatar } from "../useravatar";
import { TweetMedia } from "../tweetmedia";
import { TweetActions } from "../tweetactions";

interface TweetProps {
  data: TweetType;
  onLike?: (id: string) => void;
  onRetweet?: (id: string) => void;
  onReply?: (id: string) => void;
}

export default function Tweet({
  data,
  onLike,
  onRetweet,
  onReply,
}: Readonly<TweetProps>) {
  const { user, content, createdAt, media } = data;

  const date = new Date(createdAt).toLocaleDateString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow flex gap-3">
      {/* Avatar — clickeable */}
      <div className="cursor-pointer">
        <UserAvatar user={user} size={46} />
      </div>

      {/* Contenido */}
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
          {/* Nombre — clickeable */}
          <span className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">
            {user.name}
          </span>

          {/* Username — clickeable */}
          <span className="text-gray-500 cursor-pointer">@{user.username}</span>

          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{date}</span>
        </div>

        {/* Texto */}
        <p className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-line">
          {content}
        </p>

        {/* Media */}
        {media && media.length > 0 && <TweetMedia media={media} />}

        {/* Acciones — ya tienen cursor-pointer */}
        <TweetActions
          tweet={data}
          onLike={onLike}
          onReply={onReply}
          onRetweet={onRetweet}
        />
      </div>
    </div>
  );
}
