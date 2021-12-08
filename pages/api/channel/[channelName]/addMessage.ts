// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { uid } from "uid";
import { auth, zadd } from "@upstash/redis";
import { getSession } from "next-auth/react";
import Pusher from "pusher";

auth(process.env.UPSTASH_URL, process.env.UPSTASH_TOKEN);

export default async function handleChat(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Auth the route
  const session = await getSession({ req });
  if (!session) {
    // Bail out if not authed -- horses only
    return res.status(401).end();
  }

  // Instantiate Server Pusher
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
    secret: process.env.PUSHER_APP_SECRET as string,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
    useTLS: true,
  });

  // Create new Id for message
  const id = uid();
  // Format message
  const message = JSON.stringify({
    ...req.body,
    id,
  });
  console.log(`got a chat for channel ${req.query.channelName}`, req.body);

  // Add to sorted set, scored by the date added
  zadd(`channel#${req.query.channelName}`, Date.now(), message);
  // Emit to channel so client can pick up
  pusher.trigger(`${req.query.channelName}`, "message", message);

  return res.status(200).json({ name: "Chat" });
}
