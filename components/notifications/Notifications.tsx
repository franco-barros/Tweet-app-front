"use client";

import { useState, FC } from "react";
import { useSwipeable } from "react-swipeable";
import {
  FaBell,
  FaTimes,
  FaHeart,
  FaComment,
  FaUserPlus,
} from "react-icons/fa";

interface Notification {
  id: number;
  type: "like" | "comment" | "follow" | "mention";
  message: string;
  user: string;
  date: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "like",
    message: "le gustó tu tweet",
    user: "fran_barros",
    date: new Date().toISOString(),
    read: false,
  },
  {
    id: 2,
    type: "comment",
    message: "comentó en tu tweet",
    user: "ana_123",
    date: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
  {
    id: 3,
    type: "follow",
    message: "empezó a seguirte",
    user: "miguel_dev",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    read: false,
  },
  {
    id: 4,
    type: "mention",
    message: "te mencionó en un tweet",
    user: "lucia89",
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    read: true,
  },
];

const NotificationIcon: FC<{ type: Notification["type"] }> = ({ type }) => {
  switch (type) {
    case "like":
      return <FaHeart className="text-red-500" />;
    case "comment":
      return <FaComment className="text-blue-500" />;
    case "follow":
      return <FaUserPlus className="text-green-500" />;
    case "mention":
      return <FaBell className="text-yellow-500" />;
    default:
      return <FaBell />;
  }
};

interface NotificationItemProps {
  notification: Notification;
  markAsRead: (id: number) => void;
  deleteNotification: (id: number) => void;
}

const NotificationItem: FC<NotificationItemProps> = ({
  notification,
  markAsRead,
  deleteNotification,
}) => {
  const [swiped, setSwiped] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setSwiped(true),
    onSwipedRight: () => setSwiped(false),
    trackMouse: true,
  });

  return (
    <li {...handlers} className="relative overflow-hidden rounded-lg">
      <div
        className={`flex items-center justify-between p-3 transition-transform transform w-full text-left cursor-pointer ${
          notification.read
            ? "bg-gray-100 dark:bg-gray-800"
            : "bg-blue-50 dark:bg-blue-900/30 font-semibold"
        } ${
          swiped ? "-translate-x-24" : "translate-x-0"
        } md:translate-x-0 hover:bg-gray-200 dark:hover:bg-gray-700`}
      >
        <div className="flex items-center gap-3">
          <NotificationIcon type={notification.type} />
          <span className="text-gray-900 dark:text-gray-100">
            <span className="font-semibold">{notification.user}</span>{" "}
            {notification.message}
          </span>
        </div>

        <div className="hidden md:flex gap-2">
          {!notification.read && (
            <button
              type="button"
              onClick={() => markAsRead(notification.id)}
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              Marcar como leído
            </button>
          )}
          <button
            type="button"
            onClick={() => deleteNotification(notification.id)}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 h-full flex items-center gap-2 pr-2 md:hidden transition-all ${
          swiped ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {!notification.read && (
          <button
            type="button"
            onClick={() => markAsRead(notification.id)}
            className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm"
          >
            Leído
          </button>
        )}
        <button
          type="button"
          onClick={() => deleteNotification(notification.id)}
          className="px-2 py-1 bg-red-500 text-white rounded-md text-sm"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

const getNotificationCategory = (dateStr: string) => {
  const today = new Date();
  const date = new Date(dateStr);
  const diff = today.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days <= 7) return "Últimos 7 días";
  return "Más antiguos";
};

const Notifications: FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const categories = ["Hoy", "Ayer", "Últimos 7 días", "Más antiguos"] as const;
  const grouped: Record<string, Notification[]> = {};

  for (const c of categories) {
    grouped[c] = [];
  }

  for (const n of notifications) {
    const cat = getNotificationCategory(n.date);
    grouped[cat].push(n);
  }

  return (
    <div className="flex-1 w-full overflow-y-auto p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
        <FaBell className="text-yellow-500" /> Notificaciones
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No tienes notificaciones
        </p>
      ) : (
        <div className="space-y-4">
          {categories.map(
            (cat) =>
              grouped[cat].length > 0 && (
                <div key={cat}>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {cat}
                  </h3>
                  <ul className="space-y-2">
                    {grouped[cat].map((n) => (
                      <NotificationItem
                        key={n.id}
                        notification={n}
                        markAsRead={markAsRead}
                        deleteNotification={deleteNotification}
                      />
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
