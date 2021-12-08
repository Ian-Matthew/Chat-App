// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  // Are we authd?
  if (session) {
    // If so send the encryption key
    return res.status(200).json({ key: process.env.MESSAGE_SECRET });
  } else return res.status(401).json({ error: "Unauthorized" });
}
