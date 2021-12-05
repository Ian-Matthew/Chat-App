// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
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

  console.log(`got a chat for channel ${req.query.channelName}`, req.body);
  pusher.trigger(`${req.query.channelName}`, "message", req.body);

  return res.status(200).json({ name: "Chat" });
}
