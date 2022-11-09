// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, token, type } = JSON.parse(req.body);
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/v1/auth/`,
    {
      username,
      token,
      type,
    }
  );
  res.status(200).json(resp.data);
}

export const config = {
  api: {
    externalResolver: true,
  },
};
