// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { uid } from "uid";
import { auth, zadd } from "@upstash/redis";

auth(process.env.UPSTASH_URL, process.env.UPSTASH_TOKEN);

import Pusher from "pusher";
type Data = {
  name: string;
};

export default async function handleChat(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
    secret: process.env.PUSHER_APP_SECRET as string,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
    useTLS: true,
  });

  const id = uid();
  const message = JSON.stringify({ ...req.body, id });
  console.log(`got a chat for channel ${req.query.channelName}`, req.body);

  zadd(`channel#${req.query.channelName}`, Date.now(), message);
  pusher.trigger(`${req.query.channelName}`, "message", message);

  return res.status(200).json({ name: "Chat" });
}
