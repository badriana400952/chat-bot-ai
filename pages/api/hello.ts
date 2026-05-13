import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.message.create({
    data: {
      sender: "customer",
      message: "Halo",
    },
  });

  res.status(200).json(data);
}