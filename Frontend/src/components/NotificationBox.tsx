import { useNotification } from "../hooks/useNotification";
import { useEffect, useState } from "react";

export default function NotificationBox() {
  const { messages, remove } = useNotification();

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3 w-full max-w-sm">
      {messages.map((m) => (
        <SingleNotification key={m.id} {...m} remove={remove} />
      ))}
    </div>
  );
}

function SingleNotification({
  id,
  message,
  remove
}: {
  id: string;
  message: string;
  remove: (id: string) => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => remove(id), 300); // wait for fade-out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, remove]);

  return (
    <div
      className={`px-4 py-3 text-center rounded-xl shadow-lg bg-white border border-gray-200 text-gray-800 font-semibold transition-all duration-300
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
      `}
    >
      {message}
    </div>
  );
}
