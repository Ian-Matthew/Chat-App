import React from "react";
import { GetServerSideProps } from "next";
import { auth, zrange } from "@upstash/redis";
import { Channel } from "../../src/messages/Channel";
import { Message } from "../../src/messages/types";
import { useAuthContext } from "../../src/auth/useAuth";
function ChannelPage(props: { messages: Message[] }) {
  const { triedToAuth } = useAuthContext();
  if (!triedToAuth) return null;
  return <Channel messages={props.messages} />;
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

ChannelPage.AuthGuard = WithUserOrEmptyUser;
function WithUserOrEmptyUser({ children }: { children: React.ReactNode }) {
  const { user, session } = useAuthContext();
  return <>{children}</>;
}

export default ChannelPage;
