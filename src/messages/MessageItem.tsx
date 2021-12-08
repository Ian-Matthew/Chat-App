import classNames from "classnames";
import { useUser } from "../auth/useUser";
export function MessageItem({
  username,
  message,
}: {
  username: string;
  message: string;
}) {
  const { user } = useUser();
  const isOwnMessage = user?.trim() === username.trim();
  return (
    <div className="w-full group px-5 py-4 bg-white hover:bg-gray-50">
      <div
        className={classNames(
          "flex items-end",
          isOwnMessage ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={classNames(
            "flex flex-col space-y-1 text-sm font-medium max-w-xs mx-2",
            isOwnMessage ? "order-1 items-end" : "order-2 items-start"
          )}
        >
          <div>{username}</div>
          <div>
            <span
              className={classNames(
                "px-4 py-2 rounded-lg inline-block border border-black",
                isOwnMessage ? "rounded-br-none" : "rounded-bl-none"
              )}
            >
              {message}
            </span>
          </div>
        </div>
        <img
          src="/horse-head.svg"
          alt="My profile"
          className={classNames(
            "w-6 h-6 rounded-full",
            isOwnMessage ? "order-2" : "order-1"
          )}
        />
      </div>
    </div>
  );
}
