import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function fetchUserInfo(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })
    const body = JSON.parse(req.body)
    const { policeNo } = body

    try {
        const findRes = await prisma.user.findFirst({
            where: {
                policeNo
            }
        })
        if (!findRes) return res.status(404).json({ message: "找不到该用户！" })
        res.status(200).json(findRes)
    } catch (error) {
        res.status(400).json({ message: "获取用户信息出错！" })
    }
}
