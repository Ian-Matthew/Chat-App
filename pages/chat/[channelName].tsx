import React from "react";
import { GetServerSideProps } from "next";
import { auth, zrange } from "@upstash/redis";
import { Channel } from "../../src/messages/Channel";
import { Message } from "../../src/messages/types";
import { useUser } from "../../src/auth/useUser";
import { useSession } from "next-auth/react";

function ChannelPage(props: { messages: Message[] }) {
  return <Channel messages={props.messages} />;
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
