import React from "react";
import Pusher from "pusher-js";
import { useEncryption } from "../lib/encrypt";
import { useUser } from "../auth/useUser";
type Message = {
  channelName: string;
  username: string;
  message: string;
};

export function useLiveMessages(
  initialMessages: Message[],
  channelName: string
) {
  const { encryptMessage, decryptMessage } = useEncryption();
  const { user } = useUser();
  const isHorse = user !== "human";
  const messagesToSet = initialMessages.map((message) => {
    try {
      const decryptedMessage = isHorse
        ? decryptMessage(message.message)
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

  const [messages, setMessages] = React.useState<Message[]>(messagesToSet);

  // Method called when a socket event is received
  function handleLiveMessage(message: Message) {
    if (message.message && message.username) {
      debugger;
      const decryptedMessage = isHorse
        ? decryptMessage(message.message)
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
    const encryptedMessage = encryptMessage(messageContent);
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
