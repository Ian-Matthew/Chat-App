import React from "react";
import { GetServerSideProps } from "next";
import { auth, zrange } from "@upstash/redis";
import { Channel } from "../../src/messages/Channel";
import { Message } from "../../src/messages/types";
import { useUser } from "../../src/auth/useUser";
function ChannelPage(props: { messages: Message[] }) {
  const { user } = useUser();
  if (user) {
    return <Channel messages={props.messages} />;
  }
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  auth(process.env.UPSTASH_URL, process.env.UPSTASH_TOKEN);
  const allMessages = await zrange(
    `channel#${context.query.channelName}`,
    0,
    -1
  );
  return {
    props: {
      messages: allMessages.data.map((m: string) => JSON.parse(m)) as Message[],
    },
  };
};

export default ChannelPage;
