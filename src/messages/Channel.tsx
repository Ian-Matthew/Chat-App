import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";
import { useRouter } from "next/router";
import { Message } from "./types";
import { useLiveMessages } from "./useLiveMessages";
import { MessageItem } from "./MessageItem";
import { useAuthContext } from "../auth/useAuth";

export function Channel(props: { messages: Message[] }) {
  const router = useRouter();
  const { user, triedToAuth } = useAuthContext();
  const [messageInputValue, setMessageInputValue] = React.useState("");
  const { channelName } = router.query;

  const { messages, sendNewMessage } = useLiveMessages(
    props.messages,
    router.query.channelName as string
  );

  const messageContainerRef = React.useRef<HTMLUListElement | null>(null);

  // Effect tp scroll to bottom of message container on new message
  React.useEffect(() => {
    messageContainerRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages.length]);

  return (
    // TODO: Extract App Shell Layout
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-full items-center justify-center mt-4">
        <div className="text-4xl mb-0">🗨️🐴</div>
        <div className="text-4xl  font-bold mb-3 ">
          <span className="font-horse">
            Horse Chat<span className="!text-blue-700">.</span>
          </span>
        </div>

        {/* The Channel */}
        <div className="flex w-full max-w-screen-sm flex-row items-baseline justify-between border-b pb-3">
          <div className="flex flex-row items-baseline">
            {/* Channel Name */}
            <h2 className="sm:text-3xl text-base px-1 sm:px-4 py-1 sm:py-2 bg-white hover:bg-gray-50 font-bold flex items-baseline">
              {/* TODO: implement room switcher with many channels */}
              <span># {channelName}</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </h2>
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
          {/* List of Messages */}
          <ul
            style={{ scrollMarginBottom: "20px" }}
            ref={messageContainerRef}
            className="max-w-screen-sm mx-auto w-full"
          >
            {messages.map((message, i) => {
              return (
                <MessageItem
                  username={message.username}
                  message={message.message}
                />
              );
            })}
          </ul>
        </div>
      </main>

      {/* The Message Input Controls */}
      {user?.username ? (
        <div className="h-16 mb-10 my-5 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const messageVal = messageInputValue.trim();
              sendNewMessage(messageVal);
              setMessageInputValue("");
            }}
            className="max-w-screen-sm mx-auto flex flex-col border-[1px] border-black"
          >
            <input
              autoFocus
              value={messageInputValue}
              onChange={(e) => setMessageInputValue(e.target.value)}
              className="w-full border-0"
              type="text"
            />
            <button className="bg-black text-white px-3 py-1">send</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Channel;
