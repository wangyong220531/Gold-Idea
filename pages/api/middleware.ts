import { NextApiRequest, NextApiResponse } from "next"

export default function checkRequestMethod(req: NextApiRequest, res: NextApiResponse, next: () => NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "请求方式出错！" })
    }
    next()
}