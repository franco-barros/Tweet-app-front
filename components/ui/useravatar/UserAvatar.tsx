"use client";

import Image from "next/image";
import { User } from "../../../types/tweet";

interface UserAvatarProps {
  user: User;
  size?: number;
}

export default function UserAvatar({
  user,
  size = 48,
}: Readonly<UserAvatarProps>) {
  return (
    <Image
      src={user.avatar}
      alt={user.name}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}
