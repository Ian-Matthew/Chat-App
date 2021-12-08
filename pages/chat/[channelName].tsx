import React from "react";
import { GetServerSideProps } from "next";
import { auth, zrange } from "@upstash/redis";
import { Channel } from "../../src/messages/Channel";
import { Message } from "../../src/messages/types";
import { useUser } from "../../src/auth/useUser";
import { useSession } from "next-auth/react";

function ChannelPage(props: { messages: Message[] }) {
  const { user, key } = useUser();
  const { status } = useSession();
  // This is so authenticated users cannot see the channel until the encryption key is fetched
  if (status === "authenticated" && (!key || !user)) return null;
  // Otherwise, so long as we are authenticated, we can render the channel w/o the key -- since they wont be able to see messages anyway
  if (status !== "loading") {
    return <Channel messages={props.messages} />;
  }
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // auth redis
  auth(process.env.UPSTASH_URL, process.env.UPSTASH_TOKEN);

  // get every message -- should probably look into some of limit w/ pagination on the client
  const allMessages = await zrange(
    `channel#${context.query.channelName}`,
    0,
    -1
  );
  // Send those messages back to those horses!
  return {
    props: {
      messages: allMessages.data.map((m: string) => JSON.parse(m)) as Message[],
    },
  };
};

export default ChannelPage;
