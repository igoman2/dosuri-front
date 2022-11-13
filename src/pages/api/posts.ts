// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

let a = 1;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  a++;
  if (a > 2)
    res
      .status(200)
      .json([
        { name: "John Doe" },
        { name: "John Doe" },
        { name: "John Doe" },
        { name: "John Doe" },
        { name: "John Doe" },
      ]);
  else res.status(401).send({ error: "failed to fetch data" });
}
