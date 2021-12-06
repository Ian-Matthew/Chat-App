import type { NextPage } from "next";
import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import { GetServerSideProps } from "next";
import { auth, zrange } from "@upstash/redis";

function useLiveMessages(
  channelName: string,
  username: string,
  initialMessages: string[]
) {
  const [messages, setMessages] = React.useState<any[]>(initialMessages);

  function handleMessage({ message = null, username = null }) {
    if (message && username) {
      setMessages((messages) => [...messages, { message, username }]);
    }
  }

  function sendMessage(message: string) {
    try {
      fetch(`/api/chat/${channelName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, username }),
      });
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
      }
    );

    const channel = pusher.subscribe(channelName);

    console.log("channel", channel);

    channel.bind("message", handleMessage);
    return () => {
      channel.unbind("message", handleMessage);
    };
  }, [channelName]);

  let displayMessages =
    username === "human"
      ? messages.map((m) => ({ message: "neigh", username: "Secret Horse" }))
      : messages;

  React.useEffect(() => {
    console.log("messages", messages);
  }, [messages.length]);

  return { messages: displayMessages, sendMessage };
}
const Chat: NextPage = (props) => {
  const router = useRouter();
  const username = router.query.username || "human";
  const [message, setMessage] = React.useState("");

  const { messages, sendMessage } = useLiveMessages(
    "horses",
    username,
    props.messages
  );

  const messageContainerRef = React.useRef();

  React.useEffect(() => {
    messageContainerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages.length]);

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
              {/* TODO: implement room switcher, get this value from channel */}
              <span># horses</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            <p className="ml-3 text-sm sm:text-base truncate">
              Hay there, just horsin' around.
            </p>
          </div>
          <div className="flex text-xs sm:text-base flex-row items-center">
            {/* TODO: Add prescense to get this number */}
            {/* <span>
              <strong>5</strong> horses online
            </span> */}
          </div>
        </div>
      </div>
      <main className="mb-auto  flex-1 font-sans overflow-y-auto ">
        <div className="grid">
          <div
            style={{ scrollMarginBottom: "20px" }}
            ref={messageContainerRef}
            className="max-w-screen-sm mx-auto w-full"
          >
            {messages.map((message) => {
              return (
                <ChatItem
                  username={message.username}
                  isUser={message.username === username}
                  message={message.message}
                />
              );
            })}
          </div>
        </div>
      </main>
      {username !== "human" ? (
        <div className="h-16 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const messageVal = message.trim();
              sendMessage(messageVal);
              setMessage("");
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
      ) : null}
    </div>
  );
};
function ChatItem({ username, isUser, message }) {
  return (
    <div className="w-full group px-5 py-4 bg-white hover:bg-gray-50">
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  auth(process.env.UPSTASH_URL, process.env.UPSTASH_TOKEN);
  const allMessages = await zrange(
    `channel#${context.query.channelName}`,
    0,
    -1
  );
  return {
    props: { messages: allMessages.data.map((m) => JSON.parse(m)) },
  };
};

export default Chat;
