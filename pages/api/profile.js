import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { userInfo } from "os";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    const session = await getSession({ req });
    const email = session?.user?.email;
    if (!email) {
      res.json({});
    }
    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({ email }).lean();

    return res.json({ ...user, ...userInfo });
  }

  if (method === "PUT") {
    const session = await getSession(req, res, authOptions);
    const email = session?.user?.email;
    const { name, image, ...userInfo } = req.body;

    await User.updateOne({ email }, { name, image });
    await UserInfo.updateOne({ email }, userInfo, { upsert: true });

    return res.json(true);
  }
}
