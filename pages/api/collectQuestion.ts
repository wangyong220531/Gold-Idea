import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function collectQuestion(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })

    const body = JSON.parse(req.body)
    const { questionId, userId, isCollected } = body

    try {
        if (isCollected) {
            const collectRes = await prisma.collections.deleteMany({
                where: {
                    questionId,
                    userId
                }
            })
            if (!collectRes) return
            res.status(200).json({ message: "取消收藏成功！" })
            return
        }
        const collectRes = await prisma.collections.create({
            data: {
                questionId,
                userId
            }
        })
        if (!collectRes) return
        res.status(200).json({ message: "收藏成功！" })
    } catch (err) {
        res.status(400).json({ message: "收藏问题出错！" + err })
    }
}
