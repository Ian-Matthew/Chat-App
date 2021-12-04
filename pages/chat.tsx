import type { NextPage } from "next";
import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
const Chat: NextPage = () => {
  const router = useRouter();
  const username = router.query.username;
  const [message, setMessage] = React.useState("");
  const [chats, setChats] = React.useState([
    {
      username: "pony",
      message:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis mollitia rem delectus perspiciatis deserunt hic perferendis libero quia velit facere consequuntur, laboriosam eveniet iure quasi iste consectetur soluta ad corrupti?",
    },
    { username: "horse man", message: "imma horse ok!" },
  ]);

  const messageContainerRef = React.useRef();

  React.useEffect(() => {
    messageContainerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chats.length]);
  function sendMessage() {
    setChats([...chats, { username, message }]);
    setMessage("");
  }
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-full items-center justify-center mt-4">
        <div className="text-4xl mb-0">🗨️🐴</div>
        <div className="text-4xl  font-bold mb-3 ">
          <span className="font-horse">
            Horse Chat<span className="!text-blue-700">.</span>
          </span>
        </div>

        <div className="flex w-full max-w-screen-sm flex-row items-baseline justify-between border-b pb-3">
          <div className="flex flex-row items-baseline">
            <button className="sm:text-3xl text-base px-1 sm:px-4 py-1 sm:py-2 bg-white hover:bg-gray-50 font-bold flex items-baseline">
              {" "}
              <span># horses</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            <p className="ml-3 text-sm sm:text-base truncate">
              A Place for horses to be horses
            </p>
          </div>
          <div className="flex text-xs sm:text-base flex-row items-center">
            <span>
              <strong>5</strong> horses online
            </span>
          </div>
        </div>
      </div>
      <main className="mb-auto  flex-1 font-sans overflow-y-auto ">
        <div className="grid">
          <div
            style={{ scrollMarginBottom: "20px" }}
            ref={messageContainerRef}
            className="max-w-screen-sm mx-auto w-full my-10 space-y-5"
          >
            {chats.map((chat) => {
              return (
                <ChatItem
                  username={chat.username}
                  isUser={chat.username === username}
                  message={chat.message}
                />
              );
            })}
          </div>
        </div>
      </main>
      <div className="h-16 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="max-w-screen-sm mx-auto flex flex-col border-[1px] border-black"
        >
          <input
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-0"
            type="text"
          />
          <button className="bg-black text-white px-3 py-1">send</button>
        </form>
      </div>
      {/* <div
        style={{ gridTemplateColumns: "16rem 2fr" }}
        className="flex-grow grid"
      >

      </div> */}
    </div>
  );
};
function ChatItem({ username, isUser, message }) {
  console.log("name", username);
  return (
    <div
      className={classNames(
        "flex items-end",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={classNames(
          "flex flex-col space-y-1 text-sm font-medium max-w-xs mx-2",
          isUser ? "order-1 items-end" : "order-2 items-start"
        )}
      >
        <div>{username}</div>
        <div>
          <span
            className={classNames(
              "px-4 py-2 rounded-lg inline-block border border-black",
              isUser ? "rounded-br-none" : "rounded-bl-none"
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
          isUser ? "order-2" : "order-1"
        )}
      />
    </div>
  );
}

export default Chat;
