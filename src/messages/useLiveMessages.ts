import React from "react";
import Pusher from "pusher-js";
import { useUser } from "../auth/useUser";
type Message = {
  channelName: string;
  username: string;
  message: string;
};
import { useSession } from "next-auth/react";
import { encryptMessage, decryptMessage } from "../lib/encrypt";

export function useLiveMessages(
  initialMessages: Message[],
  channelName: string
) {
  // Grab our key and user
  const { key, user } = useUser();
  // Snag that session
  const session = useSession();
  // An authed user is a Horse. And a Horse can see messages.
  const isHorse = session.status === "authenticated";

  // Decrypt the messages
  const messagesToSet = initialMessages.map((message) => {
    try {
      const decryptedMessage = isHorse
        ? decryptMessage(message.message, key)
        : "neigh";
      const decryptedUserName = isHorse ? message.username : "Secret Horse";
      return {
        ...message,
        username: decryptedUserName,
        message: decryptedMessage,
      };
    } catch (error) {
      return {
        ...message,
        message: "neigh",
        username: "Secret Horse",
      };
    }
  });

  // Set the initial messages (before any socket events take over)
  const [messages, setMessages] = React.useState<Message[]>(messagesToSet);

  // Method called when a socket event is received
  function handleLiveMessage(message: Message) {
    if (message.message && message.username) {
      const decryptedMessage = isHorse
        ? decryptMessage(message.message, key)
        : "neigh";
      const decryptedUserName = isHorse ? message.username : "Secret Horse";
      setMessages((messages) => [
        ...messages,
        { ...message, username: decryptedUserName, message: decryptedMessage },
      ]);
    }
  }

  // Message to call when sending a new message
  function sendNewMessage(messageContent: string) {
    const encryptedMessage = encryptMessage(messageContent, key);
    if (encryptedMessage) {
      const newMessage = {
        message: encryptedMessage,
        username: user,
        channel: channelName,
      };
      try {
        fetch(`/api/channel/${channelName}/addMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Subscribe to the channel
  React.useEffect(() => {
    // create a new Pusher instance
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
      }
    );

    // subscribe to the channel
    const channel = pusher.subscribe(channelName);

    // bind to the new message event
    channel.bind("message", handleLiveMessage);

    // unsubscribe from the channel when the component unmounts
    return () => {
      channel.unbind("message", handleLiveMessage);
    };
  }, [channelName]);

  return { messages, sendNewMessage };
}
