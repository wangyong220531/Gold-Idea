import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "."

export default async function attentionQuestion(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "请求方式出错！" })

    const body = JSON.parse(req.body)
    const { questionId, userId, isAttentioned } = body

    try {
        if (isAttentioned) {
            const attentionRes = await prisma.attentions.deleteMany({
                where: {
                    questionId,
                    userId
                }
            })
            if (!attentionRes) return
            res.status(200).json({ message: "取消关注成功！" })
            return
        }
        const attentionRes = await prisma.attentions.create({
            data: {
                questionId,
                userId
            }
        })
        if (!attentionRes) return
        res.status(200).json({ message: "关注成功！" })
    } catch (err) {
        res.status(400).json({ message: "关注问题出错！" + err })
    }
}
